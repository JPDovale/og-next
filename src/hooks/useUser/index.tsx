import { getUserRequest, refreshSessionRequest } from '@api/userRequest'
// import LogRocket from 'logrocket'
import { useMemo } from 'react'
import { useQuery } from 'react-query'
import { createCheckoutSession } from './events/createCheckoutSession'
import { ICallEvent } from './types/ICallEvent'

export function useUser() {
  const { data, isLoading, refetch } = useQuery(
    'user',
    async () => {
      let response = await getUserRequest()
      let errorMessage: string | null = null
      let errorTitle: string | null = null
      let isRefreshingSession: boolean = true

      if (response.error?.title === 'Login failed') {
        const refresh = await refreshSessionRequest()

        if (refresh.ok) {
          isRefreshingSession = false
          response = await getUserRequest()
        } else {
          errorMessage = refresh.error?.title ?? null
          errorTitle = refresh.error?.message ?? null
        }
      }

      isRefreshingSession = false
      const user = response?.data?.user ?? null

      return { user, errorMessage, errorTitle, isRefreshingSession }
    },
    {
      staleTime: 1000 * 60 * 60 * 24, // 1 day
    },
  )

  const refetchUser = refetch

  const { isRefreshingSession, loadingUser, user, userIsPro, userLogged } =
    useMemo(() => {
      const user = data?.user
      const userIsPro =
        user?.account.subscription &&
        (user?.account.subscription.status === 'active' ||
          user?.account.subscription.expiresAt === null)

      const userLogged = !!user
      const loadingUser = isLoading
      const isRefreshingSession = data?.isRefreshingSession

      return {
        user,
        userIsPro,
        userLogged,
        loadingUser,
        isRefreshingSession,
      }
    }, [data, isLoading])

  // if (!loadingUser && userLogged && user) {
  //   LogRocket.identify(user.account.id, {
  //     name: user.infos.username,
  //     email: user.infos.email,

  //     // Add your own custom user variables here, ie:
  //     subscriptionType: userIsPro ? 'pro' : 'trail',
  //   })
  // }

  const callEvent: ICallEvent = {
    createCheckoutSession: (priceId) => createCheckoutSession(priceId),
  }

  return {
    user,
    userIsPro,
    userLogged,
    loadingUser,
    isRefreshingSession,
    refetchUser,
    callEvent,
  }
}
