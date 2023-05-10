import { refreshSessionFunction } from '@contexts/user/functions/refreshSessionFunction'
import { setErrorAction as setErrorUserAction } from '@contexts/user/reducer/actionsUserReducer'
import { Dispatch } from 'react'

type Into = 'projects' | 'user'

interface IResponseDealings {
  response: any
  dispatch: Dispatch<any>
  into: Into
  callback: () => Promise<boolean>
}

export async function responseDealings({
  response,
  dispatch,
  into,
  callback,
}: IResponseDealings) {
  if (response.errorMessage === 'Invalid token') {
    const isRefreshed = await refreshSessionFunction()

    if (isRefreshed) {
      await callback()
      return true
    } else {
      switch (into) {
        case 'projects': {
          return false
        }

        case 'user': {
          return false
        }
        default:
          return false
      }
    }
  }

  if (response.errorMessage) {
    switch (into) {
      case 'projects': {
        return false
      }

      case 'user': {
        dispatch(
          setErrorUserAction({
            title: response.errorTitle as string,
            message: response.errorMessage,
          }),
        )
        return false
      }

      default:
        return false
    }
  }

  return true
}
