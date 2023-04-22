import { IError } from '@@types/errors/IError'
import { refreshSessionFunction } from '@contexts/user/functions/refreshSessionFunction'

interface IResponseDealings<T> {
  response: any
  callback: () => Promise<T>
}

interface IResponse {
  error?: IError
  handledAnswer: boolean
}

export async function responseDealings<TypeCallback>({
  response,
  callback,
}: IResponseDealings<TypeCallback>): Promise<IResponse> {
  if (response.errorMessage === 'Invalid token') {
    const isRefreshed = await refreshSessionFunction()

    if (isRefreshed) {
      await callback()
      return {
        handledAnswer: true,
      }
    } else {
      return {
        handledAnswer: false,
        error: {
          title: 'Sessions expirers!',
          message: 'Sessions expirers!',
        },
      }
    }
  }

  if (response.errorMessage) {
    return {
      handledAnswer: false,
      error: {
        title: response.errorTitle,
        message: response.errorMessage,
      },
    }
  }

  return {
    handledAnswer: true,
  }
}
