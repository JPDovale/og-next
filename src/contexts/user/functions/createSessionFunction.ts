import { Dispatch } from 'react'
import { IError } from '../../../@types/errors/IError'
import { api } from '../../../api'
import { INewSessionDTO } from '../../../api/dtos/INewSessionDTO'
import { createSessionRequest } from '../../../api/userRequest'
import { setErrorAction, setUserAction } from '../reducer/actionsUserReducer'

export async function createSessionFunction(
  newSession: INewSessionDTO,
  dispatch: Dispatch<any>,
): Promise<boolean> {
  const logged = await createSessionRequest(
    newSession.email,
    newSession.password,
  )

  if (logged.errorTitle) {
    const error: IError = {
      title: logged.errorTitle,
      message: logged.errorMessage as string,
    }

    dispatch(setErrorAction(error))
    return false
  }

  localStorage.setItem(
    '@og-user-refreshToken',
    JSON.stringify(logged.refreshToken),
  )
  localStorage.setItem('@og-user-token', JSON.stringify(logged.token))
  api.defaults.headers.authorization = `Bearer ${logged.token}`

  dispatch(setUserAction(logged.user))
  return true
}
