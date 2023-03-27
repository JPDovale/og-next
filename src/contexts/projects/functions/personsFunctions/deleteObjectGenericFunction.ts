import { IBoxResponse } from '@api/responsesTypes/IBoxResponse'
import { Dispatch } from 'react'
import { IEditorTo } from '../../../../@types/editores/IEditorTo'
import { IGenericObject } from '../../../../@types/editores/IGenericObject'
import { deleteObjectGenericRequest } from '../../../../api/personsRequests'
import { IPersonsResponse } from '../../../../api/responsesTypes/IPersonsResponse'
import { recognizeObject } from '../../../../services/recognizeObject'
import { refreshSessionFunction } from '../../../user/functions/refreshSessionFunction'
import {
  setErrorAction,
  setLoadingAction,
  updatePersonAction,
} from '../../reducer/actionsProjectsReducer'

export async function deleteObjectGenericFunction(
  generic: IGenericObject,
  personId: string,
  genericId: string,
  to: IEditorTo,
  dispatch: Dispatch<any>,
): Promise<void> {
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

    return
  }

  const response = await deleteObjectGenericRequest(objectToSend)

  if (response.errorMessage === 'Invalid token') {
    const isRefreshed = await refreshSessionFunction()

    if (isRefreshed) {
      return deleteObjectGenericFunction(
        generic,
        personId,
        genericId,
        to,
        dispatch,
      )
    } else {
      dispatch(setLoadingAction(false))

      return
    }
  }

  if (response.errorMessage) {
    dispatch(setLoadingAction(false))

    dispatch(
      setErrorAction({
        title: response.errorTitle,
        message: response.errorMessage,
      }),
    )

    return
  }

  const person = response.person as IPersonsResponse
  const box = response.box as IBoxResponse

  dispatch(updatePersonAction(person, box))
  dispatch(setLoadingAction(false))
}
