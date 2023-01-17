import { Dispatch } from 'react'
import { getUserRequest } from '../../../api/userRequest'
import { setUserAction } from '../reducer/actionsUserReducer'
import { refreshSessionFunction } from './refreshSessionFunction'

export async function getUserFunction(
  dispatch: Dispatch<any>,
): Promise<boolean> {
  const user = await getUserRequest()

  if (user.errorMessage === 'Invalid token') {
    const isRefreshed = await refreshSessionFunction()

    if (isRefreshed) {
      return getUserFunction(dispatch)
    } else {
      return false
    }
  }

  dispatch(setUserAction(user))
  return true
}
