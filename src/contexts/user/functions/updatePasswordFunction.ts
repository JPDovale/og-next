import { Dispatch } from 'react'
import { IError } from '../../../@types/errors/IError'
import { IUpdatePasswordDTO } from '../../../api/dtos/IUpdatePasswordDTO'
import { updatePasswordRequest } from '../../../api/userRequest'
import { setErrorAction } from '../reducer/actionsUserReducer'
import { refreshSessionFunction } from './refreshSessionFunction'

export async function updatePasswordFunction(
  oldPassword: string,
  password: string,
  dispatch: Dispatch<any>,
): Promise<any> {
  if (!oldPassword || !password) {
    return dispatch(
      setErrorAction({
        title: 'Error ao processar as informações',
        message:
          'Verifique as informações fornecidas e tente novamente. Certifique-se de que todos os campos estão preenchidos corretamente.',
      }),
    )
  }

  const passwords: IUpdatePasswordDTO = {
    password,
    oldPassword,
  }

  const response = await updatePasswordRequest(passwords)

  if (response.errorMessage === 'Invalid token') {
    const isRefreshed = await refreshSessionFunction()

    if (isRefreshed) {
      return updatePasswordFunction(oldPassword, password, dispatch)
    }
  }

  if (response.errorTitle) {
    const error: IError = {
      title: response.errorTitle,
      message: response.errorMessage as string,
    }

    dispatch(setErrorAction(error))
  }
}
