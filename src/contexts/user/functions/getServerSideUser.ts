import { IncomingMessage, ServerResponse } from 'http'
import { api, GetInfoUser } from '../../../api'
import { IUserResponse } from '../../../api/responsesTypes/IUserResponse'
import { refreshSessionRequest } from '../../../api/userRequest'

export async function getServerSideUser(
  req: IncomingMessage & {
    cookies: Partial<{
      [key: string]: string
    }>
  },
  res: ServerResponse<IncomingMessage>,
) {
  const token = req.cookies['@og_api:refresh_token']
  let user: IUserResponse | null = null

  const userStarted = await GetInfoUser()

  if (userStarted.errorMessage === 'Invalid token' && token) {
    const tokens = await refreshSessionRequest(token)

    if (tokens.errorTitle)
      return {
        props: {
          user,
        },
      }

    api.defaults.headers.Authorization = `Bearer ${tokens.token}`

    const userStarted = await GetInfoUser()
    user = userStarted as IUserResponse
  } else {
    user = userStarted
  }

  return {
    props: {
      user,
    },
  }
}
