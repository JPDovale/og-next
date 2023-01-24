import { api } from '../../../api'
import { refreshSessionRequest } from '../../../api/userRequest'

export async function refreshSessionFunction(): Promise<boolean> {
  const tokenString = localStorage.getItem('@og-user-refreshToken')?.toString()

  if (!tokenString || tokenString === 'undefined') return false
  const refreshToken = JSON.parse(tokenString || '')

  const tokens = await refreshSessionRequest(refreshToken)

  if (tokens.errorTitle === 'Invalid token') {
    return false
  }

  localStorage.setItem(
    '@og-user-refreshToken',
    JSON.stringify(tokens.refreshToken),
  )
  localStorage.setItem('@og-user-token', JSON.stringify(tokens.token))
  api.defaults.headers.Authorization = `Bearer ${tokens.token}`

  return true
}
