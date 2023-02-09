import { verifyRequest } from '../../../api/userRequest'
import { refreshSessionFunction } from './refreshSessionFunction'

interface IResponse {
  admin: boolean
}

export async function verifyFunction(): Promise<IResponse> {
  const response = await verifyRequest()

  if (response.errorMessage === 'Invalid token') {
    const isRefreshed = await refreshSessionFunction()

    if (isRefreshed) {
      return verifyFunction()
    } else {
      return {
        admin: false,
      }
    }
  }

  if (response.errorMessage) {
    return {
      admin: false,
    }
  }

  return response as IResponse
}
