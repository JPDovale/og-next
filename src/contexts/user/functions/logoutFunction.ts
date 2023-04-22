import { Dispatch } from 'react'
import { logouRequest } from '../../../api/userRequest'
import { setUserAction } from '../reducer/actionsUserReducer'

export async function logoutFunction(dispatch: Dispatch<any>) {
  await logouRequest()

  dispatch(setUserAction(null))
}
