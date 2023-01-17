import { setUserAction } from '../reducer/actionsUserReducer'
import { Dispatch } from 'react'
import { ICreateSessionResponse } from '../../../api/responsesTypes/ICreateResponse'
import { api } from '../../../api'

export function setUserFunction(
  loggedUser: ICreateSessionResponse,
  dispatch: Dispatch<any>,
) {
  if (!loggedUser) return

  if (loggedUser.refreshToken && loggedUser.token) {
    localStorage.setItem(
      '@og-user-refreshToken',
      JSON.stringify(loggedUser.refreshToken),
    )
    localStorage.setItem('@og-user-token', JSON.stringify(loggedUser.token))
    api.defaults.headers.authorization = `Bearer ${loggedUser.token}`
  }

  dispatch(setUserAction(loggedUser.user))
}
