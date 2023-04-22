import { refreshSessionRequest } from '@api/userRequest'

export async function refreshSessionFunction(): Promise<boolean> {
  const response = await refreshSessionRequest()

  if (response.data?.errorMessage === 'Invalid token') {
    return false
  }

  return true
}
