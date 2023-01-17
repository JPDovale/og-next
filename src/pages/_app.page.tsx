import type { AppProps } from 'next/app'

import { SessionProvider } from 'next-auth/react'

import { InterfaceProvider } from '../contexts/interface'
import { ProjectsProvider } from '../contexts/projects'
import { UserProvider } from '../contexts/user'
import { globalStyles } from '../styles/global'

globalStyles()

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <InterfaceProvider>
        <UserProvider>
          <ProjectsProvider>
            <Component {...pageProps} />
          </ProjectsProvider>
        </UserProvider>
      </InterfaceProvider>
    </SessionProvider>
  )
}
