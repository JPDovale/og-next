import { IUserResponse } from '@api/responsesTypes/IUserResponse'
import { getUserRequest, refreshSessionRequest } from '@api/userRequest'
import { UserContext } from '@contexts/user'
import LogRocket from 'logrocket'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { useQuery } from 'react-query'

export function useUser() {
  const { loading, setLoading } = useContext(UserContext)

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
      onSuccess: () => setLoading(false),
      onError: () => setLoading(false),
    },
  )

  const refetchUser = refetch
  const user = data?.user ?? null
  const userLogged = !!user
  const loadingUser = isLoading || loading
  const isRefreshingSession = data?.isRefreshingSession

  const router = useRouter()

  if (!loadingUser && !userLogged && router.pathname.includes('project')) {
    router.push('/login')
  }

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
