import { IUserResponse } from '@api/responsesTypes/IUserResponse'
import { getUserRequest, refreshSessionRequest } from '@api/userRequest'
import LogRocket from 'logrocket'
import { useQuery } from 'react-query'

export function useUser() {
  const { data, isLoading, refetch } = useQuery(
    'user',
    async () => {
      let response = await getUserRequest()
      let errorMessage: string | null = null
      let errorTitle: string | null = null
      let isRefreshingSession: boolean = true

      if (response.errorMessage === 'Invalid token') {
        const refresh = await refreshSessionRequest()

        if (!refresh.errorMessage) {
          isRefreshingSession = false
          response = await getUserRequest()
        } else {
          errorMessage = refresh.errorMessage
          errorTitle = refresh.errorTitle
        }
      }

      const user = response.user as IUserResponse
      isRefreshingSession = false

      return { user, errorMessage, errorTitle, isRefreshingSession }
    },
    {
      staleTime: 1000 * 60 * 60 * 24, // 1 day
    },
  )

  const refetchUser = refetch
  const user = data?.user ?? null
  const userLogged = !!user
  const loadingUser = isLoading
  const isRefreshingSession = data?.isRefreshingSession

  if (!loadingUser && userLogged && user) {
    LogRocket.identify(user.id, {
      name: user.username,
      email: user.email,

      // Add your own custom user variables here, ie:
      subscriptionType: 'trail',
    })
  }

  return {
    user,
    userLogged,
    loadingUser,
    isRefreshingSession,
    refetchUser,
  }
}
