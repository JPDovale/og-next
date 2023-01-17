import { Dispatch } from 'react'
import { updateImagePersonRequest } from '../../../../api/personsRequests'
import { IPersonsResponse } from '../../../../api/responsesTypes/IPersonsResponse'
import { refreshSessionFunction } from '../../../user/functions/refreshSessionFunction'
import {
  setErrorAction,
  updatePersonAction,
} from '../../reducer/actionsProjectsReducer'

export async function updateImageFromPersonFunction(
  file: File,
  personId: string,
  dispatch: Dispatch<any>,
): Promise<boolean> {
  if (!file || !personId) {
    dispatch(
      setErrorAction({
        title: 'Imagem não alterada',
        message:
          'Verifique as informações fornecidas e tente novamente. Certifique-se de que todos os campos estão preenchidos corretamente.',
      }),
    )
    return false
  }

  const response = await updateImagePersonRequest(personId, file)

  if (response.errorMessage === 'Invalid token') {
    const isRefreshed = await refreshSessionFunction()

    if (isRefreshed) {
      return updateImageFromPersonFunction(file, personId, dispatch)
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
