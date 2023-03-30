import { IBoxResponse } from '@api/responsesTypes/IBoxResponse'
import { Dispatch } from 'react'
import { IEditorTo } from '@@types/editores/IEditorTo'
import { IGenericObject } from '@@types/editores/IGenericObject'
import { deleteObjectGenericRequest } from '@api/personsRequests'
import { IPersonsResponse } from '@api/responsesTypes/IPersonsResponse'
import { recognizeObject } from '@services/recognizeObject'

import { responseDealings } from '@services/responseDealings'
import { updatePersonAndBoxAction } from '@contexts/projects/reducer/actions/persons/updatePersonAndBoxAction'
import { setLoadingAction } from '@contexts/projects/reducer/actions/projects/setLoadingAction'
import { setErrorAction } from '@contexts/projects/reducer/actions/projects/setErrorAction'

interface IDeleteObjectGenericFunction {
  generic: IGenericObject
  personId: string
  genericId: string
  to: IEditorTo
  dispatch: Dispatch<any>
}

export async function deleteObjectGenericFunction({
  dispatch,
  generic,
  genericId,
  personId,
  to,
}: IDeleteObjectGenericFunction): Promise<boolean> {
  dispatch(setLoadingAction(true))

  const objectToSend = recognizeObject(
    to,
    personId,
    '',
    generic,
    '',
    genericId,
    undefined,
    generic.coupleId,
  )

  if (!objectToSend) {
    dispatch(setLoadingAction(false))

    dispatch(
      setErrorAction({
        title: 'Error ao processar as informações',
        message:
          'Verifique as informações fornecidas e tente novamente. Certifique-se de que todos os campos estão preenchidos corretamente.',
      }),
    )

    return false
  }

  const response = await deleteObjectGenericRequest(objectToSend)

  const handledAnswer = await responseDealings({
    response,
    dispatch,
    into: 'projects',
    callback: () =>
      deleteObjectGenericFunction({
        dispatch,
        generic,
        genericId,
        personId,
        to,
      }),
  })

  if (handledAnswer === false) return false

  const person = response.person as IPersonsResponse
  const box = response.box as IBoxResponse

  dispatch(updatePersonAndBoxAction({ person, box }))

  return true
}
