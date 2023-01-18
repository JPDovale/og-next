import { Dispatch } from 'react'
import { getUserRequest } from '../../../api/userRequest'
import { setErrorAction, setUserAction } from '../reducer/actionsUserReducer'
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
      dispatch(
        setErrorAction({
          title: 'Access denied',
          message: 'Sua seção expirou, efetue o login novamente.',
        }),
      )
      return false
    }
  }

  dispatch(setUserAction(user))
  return true
}
