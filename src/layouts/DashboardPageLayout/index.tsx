import { HeaderOptions } from '@components/HeaderOptions'
import { NavigationBar } from '@components/Navigation'
import { InterfaceContext } from '@contexts/interface'
import { UserContext } from '@contexts/user'
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
}

export function DashboardPageLayout({
  children,
  window,
  query,
  setQuery,
  queryless = false,
  loading = false,
}: IDashboardPageLayoutProps) {
  const { navIsOpen } = useContext(InterfaceContext)
  const { userLogged, loading: loadingUser } = useContext(UserContext)

  const router = useRouter()

  useEffect(() => {
    if (loadingUser) return
    if (!userLogged) router.push('/login')
  }, [userLogged, loadingUser, router])

  return (
    <>
      <NavigationBar />
      <DashboardPageLayoutContainer NavIsOpen={navIsOpen}>
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
