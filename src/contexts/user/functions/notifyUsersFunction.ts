import { notifyUsersRequest } from '../../../api/userRequest'
import { refreshSessionFunction } from './refreshSessionFunction'

export async function notifyUsersFunction(
  title: string,
  content: string,
): Promise<void> {
  const response = await notifyUsersRequest(title, content)

  if (response.errorMessage === 'Invalid token') {
    const isRefreshed = await refreshSessionFunction()

    if (isRefreshed) {
      return notifyUsersFunction(title, content)
    }
  }
}
