import { Dispatch } from 'react'
import { IEditorTo } from '@@types/editores/IEditorTo'
import { IGenericObject } from '@@types/editores/IGenericObject'
import { updateObjectGenericRequest } from '@api/personsRequests'
import { IPersonsResponse } from '@api/responsesTypes/IPersonsResponse'
import { recognizeObject } from '@services/recognizeObject'
import { responseDealings } from '@services/responseDealings'
import { updatePersonAction } from '@contexts/projects/reducer/actions/persons/updatePersonAction'
import { setLoadingAction } from '@contexts/projects/reducer/actions/projects/setLoadingAction'
import { setErrorAction } from '@contexts/projects/reducer/actions/projects/setErrorAction'

interface IUpdateObjectGenericFunction {
  generic: IGenericObject
  personId: string
  genericId: string
  to: IEditorTo
  dispatch: Dispatch<any>
}

export async function updateObjectGenericFunction({
  generic,
  personId,
  genericId,
  to,
  dispatch,
}: IUpdateObjectGenericFunction): Promise<boolean> {
  dispatch(setLoadingAction(true))

  const objectToSend = recognizeObject(to, personId, '', generic, '', genericId)

  if (!objectToSend) {
    dispatch(
      setErrorAction({
        title: 'Error ao processar as informações',
        message:
          'Verifique as informações fornecidas e tente novamente. Certifique-se de que todos os campos estão preenchidos corretamente.',
      }),
    )
    dispatch(setLoadingAction(false))

    return false
  }

  const response = await updateObjectGenericRequest(objectToSend)

  const handledAnswer = await responseDealings({
    response,
    dispatch,
    into: 'projects',
    callback: () =>
      updateObjectGenericFunction({
        generic,
        personId,
        genericId,
        to,
        dispatch,
      }),
  })

  if (handledAnswer === false) return false

  const person = response as IPersonsResponse
  dispatch(updatePersonAction({ person }))

  return true
}
