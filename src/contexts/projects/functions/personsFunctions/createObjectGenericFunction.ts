import { IBoxResponse } from '@api/responsesTypes/IBoxResponse'
import { updateCouplesPersonAction } from '@contexts/projects/reducer/actions/persons/updateCouplesPersonAction'
import { updatePersonAndBoxAction } from '@contexts/projects/reducer/actions/persons/updatePersonAndBoxAction'
import { responseDealings } from '@services/responseDealings'
import { Dispatch } from 'react'
import { IEditorTo } from '@@types/editores/IEditorTo'
import { IGenericObject } from '@@types/editores/IGenericObject'
import { createObjectGenericRequest } from '@api/personsRequests'
import { IPersonsResponse } from '@api/responsesTypes/IPersonsResponse'
import { recognizeObject } from '@services/recognizeObject'
import { setLoadingAction } from '@contexts/projects/reducer/actions/projects/setLoadingAction'
import { setErrorAction } from '@contexts/projects/reducer/actions/projects/setErrorAction'

interface ICreateObjectGenericFunction {
  generic: IGenericObject
  to: IEditorTo
  personId: string
  projectId: string
  dispatch: Dispatch<any>
}

export async function createObjectGenericFunction({
  dispatch,
  to,
  personId,
  projectId,
  generic,
}: ICreateObjectGenericFunction): Promise<boolean> {
  dispatch(setLoadingAction(true))

  const objectToSend = recognizeObject(to, personId, projectId, generic)

  if (!objectToSend) {
    dispatch(
      setErrorAction({
        title: 'Error ao processar as informações',
        message:
          'Verifique as informações fornecidas e tente novamente. Certifique-se de que todos os campos estão preenchidos corretamente.',
      }),
    )
    return false
  }

  const response = await createObjectGenericRequest(objectToSend)

  const handledAnswer = await responseDealings({
    response,
    dispatch,
    into: 'projects',
    callback: () =>
      createObjectGenericFunction({
        generic,
        projectId,
        to,
        personId,
        dispatch,
      }),
  })

  if (handledAnswer === false) return false

  if (response.personOfCouple) {
    const person = response.person
    const personOfCouple = response.personOfCouple

    dispatch(updateCouplesPersonAction({ person, personOfCouple }))

    return true
  }

  const person = response.person as IPersonsResponse
  const box = response.box as IBoxResponse

  dispatch(updatePersonAndBoxAction({ person, box }))

  return true
}
