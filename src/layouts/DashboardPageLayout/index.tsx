import { HeaderOptions } from '@components/HeaderOptions'
import { HeaderOptionsSkeleton } from '@components/HeaderOptions/skeleton'
import { NavigationBar } from '@components/Navigation'
import { Skeleton } from '@components/usefull/Skeleton'
import { InterfaceContext } from '@contexts/interface'
import { useUser } from '@hooks/useUser'
import { useRouter } from 'next/router'
import { ReactNode, useContext, useEffect } from 'react'

import { DashboardPageLayoutContainer } from './styles'

interface IDashboardPageLayoutProps {
  children: ReactNode

  window: string
  query?: string
  setQuery?: (newState: string) => void
  queryless?: boolean
  loading?: boolean
  disableAccessibilityBottom?: boolean
  disableScroll?: boolean
}

export function DashboardPageLayout({
  children,
  window,
  query,
  setQuery,
  queryless = false,
  loading = false,
  disableAccessibilityBottom = false,
  disableScroll = false,
}: IDashboardPageLayoutProps) {
  const { navIsOpen } = useContext(InterfaceContext)
  const { userLogged, loadingUser, user } = useUser()

  const router = useRouter()

  useEffect(() => {
    if (!userLogged && !loadingUser) router.push('/login')
  }, [userLogged, router, loadingUser])

  if (loadingUser || !user) {
    return (
      <>
        <Skeleton wrapper={NavigationBar} />
        <DashboardPageLayoutContainer
          NavIsOpen={navIsOpen}
          disableAccessibilityBottom={disableAccessibilityBottom}
          disableScroll={disableScroll}
        >
          <HeaderOptionsSkeleton />
          {children}
        </DashboardPageLayoutContainer>
      </>
    )
  }

  return (
    <>
      <NavigationBar />
      <DashboardPageLayoutContainer
        NavIsOpen={navIsOpen}
        disableAccessibilityBottom={disableAccessibilityBottom}
        disableScroll={disableScroll}
      >
        <HeaderOptions
          isLoading={loading}
          windowName={window}
          query={query}
          setQuery={setQuery}
          queryless={queryless}
        />
        {children}
      </DashboardPageLayoutContainer>
    </>
  )
}
