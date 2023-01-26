import { Dispatch } from 'react'
import { visualizeNotificationsRequest } from '../../../api/userRequest'
import { setUserAction } from '../reducer/actionsUserReducer'
import { refreshSessionFunction } from './refreshSessionFunction'

interface IVisualizeNotificationsFunction {
  dispatch: Dispatch<any>
}

export async function visualizeNotificationsFunction({
  dispatch,
}: IVisualizeNotificationsFunction): Promise<any> {
  const user = await visualizeNotificationsRequest()

  if (user.errorMessage === 'Invalid token') {
    const isRefreshed = await refreshSessionFunction()

    if (isRefreshed) {
      return visualizeNotificationsFunction({ dispatch })
    } else {
      // dispatch(
      //   setErrorAction({
      //     title: 'Access denied',
      //     message: 'Sua seção expirou, efetue o login novamente.',
      //   }),
      // )
      return false
    }
  }

  dispatch(setUserAction(user))
  return true
}
