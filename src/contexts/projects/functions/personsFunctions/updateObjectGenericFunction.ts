import { Dispatch } from 'react'
import { IEditorTo } from '../../../../@types/editores/IEditorTo'
import { IGenericObject } from '../../../../@types/editores/IGenericObject'
import { updateObjectGenericRequest } from '../../../../api/personsRequests'
import { IPersonsResponse } from '../../../../api/responsesTypes/IPersonsResponse'
import { recognizeObject } from '../../../../services/recognizeObject'
import { refreshSessionFunction } from '../../../user/functions/refreshSessionFunction'
import {
  setErrorAction,
  updatePersonAction,
} from '../../reducer/actionsProjectsReducer'

export async function updateObjectGenericFunction(
  generic: IGenericObject,
  personId: string,
  genericId: string,
  to: IEditorTo,
  dispatch: Dispatch<any>,
): Promise<boolean> {
  if (!generic || !personId || !genericId || !to) {
    dispatch(
      setErrorAction({
        title: 'Error ao processar as informações',
        message:
          'Verifique as informações fornecidas e tente novamente. Certifique-se de que todos os campos estão preenchidos corretamente.',
      }),
    )
    return false
  }

  const objectToSend = recognizeObject(to, personId, '', generic, '', genericId)

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

  const response = await updateObjectGenericRequest(objectToSend)

  if (response.errorMessage === 'Invalid token') {
    const isRefreshed = await refreshSessionFunction()

    if (isRefreshed) {
      return updateObjectGenericFunction(
        generic,
        personId,
        genericId,
        to,
        dispatch,
      )
    } else {
      return false
    }
  }

  if (response.errorMessage) {
    dispatch(
      setErrorAction({
        title: response.errorTitle,
        message: response.errorMessage,
      }),
    )
    return false
  }

  const person = response as IPersonsResponse
  dispatch(updatePersonAction(person))

  return true
}
