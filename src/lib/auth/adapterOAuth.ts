import {
  createOAuthAccountRequest,
  createOAuthSessionRequest,
  createOAuthUserRequest,
  getOauthByAccountUserRequest,
  // getOauthByEmailUserRequest,
  getOauthUserRequest,
  getSessionAndUserRequest,
  updateOAuthUserRequest,
  updateSessionRequest,
} from '@api/userRequest'
import { NextApiRequest, NextApiResponse } from 'next'
import { Adapter } from 'next-auth/adapters'
import { setCookie } from 'nookies'

export function AdapterOAuth(
  req: NextApiRequest,
  res: NextApiResponse,
): Adapter {
  return {
    async createUser(user) {
      const response = await createOAuthUserRequest({
        email: user.email,
        name: user.name,
        imageUrl: user.image,
      })

      return {
        account: response.data!.user.account,
        email: response.data!.user.infos.email,
        emailVerified: null,
        id: response.data!.user.account.id,
        infos: response.data!.user.infos,
      }
    },

    async getUser(id) {
      const response = await getOauthUserRequest({ id })

      if (!response.data) {
        return null
      }

      return {
        account: response.data!.user.account,
        email: response.data!.user.infos.email,
        emailVerified: null,
        id: response.data!.user.account.id,
        infos: response.data!.user.infos,
      }
    },

    async getUserByEmail(email) {
      return null
      // const response = await getOauthByEmailUserRequest({ email })

      // if (!response.data) {
      //   return null
      // }

      // return {
      //   account: response.data!.user.account,
      //   email: response.data!.user.infos.email,
      //   emailVerified: null,
      //   id: response.data!.user.account.id,
      //   infos: response.data!.user.infos,
      // }
    },

    async getUserByAccount({ providerAccountId, provider }) {
      const response = await getOauthByAccountUserRequest({
        provider,
        providerAccountId,
      })

      if (!response.data) {
        return null
      }

      return {
        account: response.data.user.account,
        email: response.data.user.infos.email,
        emailVerified: null,
        id: response.data.user.account.id,
        infos: response.data.user.infos,
      }
    },

    async updateUser(user) {
      const response = await updateOAuthUserRequest(
        {
          email: user.infos?.email,
          name: user.infos?.name,
          username: user.infos?.username,
        },
        user.account!.id,
      )

      return {
        account: response.data!.user.account,
        email: response.data!.user.infos.email,
        emailVerified: null,
        id: response.data!.user.account.id,
        infos: response.data!.user.infos,
      }
    },

    async deleteUser(userId) {},

    async linkAccount(account) {
      await createOAuthAccountRequest({
        accessToken: account.access_token ?? '',
        expiresAt: account.expires_at ?? 0,
        idToken: account.id_token ?? '',
        provider: account.provider,
        providerAccountId: account.providerAccountId,
        refreshToken: account.refresh_token ?? '',
        scope: account.scope ?? '',
        sessionState: account.session_state ?? '',
        tokenType: account.token_type ?? '',
        type: account.type,
        userId: account.userId,
      })
    },

    async unlinkAccount({ providerAccountId, provider }) {},

    async createSession({ sessionToken, userId, expires }) {
      await createOAuthSessionRequest({
        expires,
        sessionToken,
        userId,
      })

      return {
        expires,
        sessionToken,
        userId,
      }
    },

    async getSessionAndUser(sessionToken) {
      const response = await getSessionAndUserRequest(sessionToken)

      if (!response.data) {
        return null
      }

      setCookie({ res }, '@og-token', response.data.token, {
        maxAge: 1000 * 60 * 10, // 10 min
        httpOnly: true,
        path: '/',
        sameSite: false,
        secure: true,
      })

      setCookie({ res }, '@og-refresh-token', response.data.refreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        httpOnly: true,
        path: '/',
        sameSite: false,
        secure: true,
      })

      return {
        session: {
          expires: new Date(response.data!.session.expires),
          userId: response.data!.session.user_id,
          sessionToken: response.data!.session.session_token!,
        },
        user: {
          account: response.data!.user.account,
          email: response.data!.user.infos.email,
          id: response.data!.user.account.id,
          infos: response.data!.user.infos,
          emailVerified: null,
        },
      }
    },

    async updateSession({ sessionToken, userId, expires }) {
      const response = await updateSessionRequest(sessionToken, expires, userId)

      return {
        sessionToken: response.data!.session.session_token!,
        expires: response.data!.session.expires,
        userId: response.data!.session.user_id,
      }
    },

    async deleteSession(sessionToken) {},

    // async createVerificationToken({ identifier, expires, token }) {},

    // async useVerificationToken({ identifier, token }) {},
  }
}
