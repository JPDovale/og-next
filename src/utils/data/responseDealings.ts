import { IError } from '@@types/errors/IError'
import { refreshSessionRequest } from '@api/userRequest'

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
  if (response.error?.title === 'Login failed') {
    const response = await refreshSessionRequest()

    if (response.ok) {
      await callback()
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
