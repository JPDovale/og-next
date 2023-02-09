import { Dispatch } from 'react'
import { api } from '../../../api'
import { logouRequest } from '../../../api/userRequest'
import { setUserAction } from '../reducer/actionsUserReducer'

export async function logoutFunction(dispatch: Dispatch<any>) {
  logouRequest()

  localStorage.removeItem('@og-user-token')
  localStorage.removeItem('@og-user-refreshToken')
  localStorage.removeItem('@og-user')
  localStorage.removeItem('@og-projects')
  localStorage.removeItem('@og-persons')
  api.defaults.headers.authorization = null

  dispatch(setUserAction(undefined))
}
