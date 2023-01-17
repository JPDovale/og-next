import { Dispatch } from 'react'
import { IError } from '../../../@types/errors/IError'
import { api } from '../../../api'
import { loginWithGoogleRequest } from '../../../api/userRequest'
import { setErrorAction, setUserAction } from '../reducer/actionsUserReducer'

export async function loginWithGoogleFunction(
  user: any,
  dispatch: Dispatch<any>,
) {
  const response = await loginWithGoogleRequest(user)

  if (response.errorTitle) {
    const error: IError = {
      title: response.errorTitle,
      message: response.errorMessage as string,
    }

    dispatch(setErrorAction(error))
    return
  }

  if (response.token && response.refreshToken) {
    localStorage.setItem(
      '@og-user-refreshToken',
      JSON.stringify(response.refreshToken),
    )
    localStorage.setItem('@og-user-token', JSON.stringify(response.token))
    api.defaults.headers.authorization = `Bearer ${response.token}`
  }

  dispatch(setUserAction(response.user))
}
