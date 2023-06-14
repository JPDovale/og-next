import { IError } from '@@types/errors/IError'
import { IResponse } from '@api/responses/IResponse'
import { refreshSessionRequest } from '@api/userRequest'

interface IResponseDealings<T> {
  response: IResponse
  callback: () => Promise<T>
}

interface IResponseDealingsResponse {
  error?: IError
  handledAnswer: boolean
}

export async function responseDealings<TypeCallback>({
  response,
  callback,
}: IResponseDealings<TypeCallback>): Promise<IResponseDealingsResponse> {
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

  if (response.error) {
    return {
      handledAnswer: false,
      error: {
        title: response.error.title,
        message: response.error.message,
      },
    }
  }

  return {
    handledAnswer: true,
  }
}
