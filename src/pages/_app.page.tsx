import type { AppProps } from 'next/app'

// import { SessionProvider } from 'next-auth/react'

import { InterfaceProvider } from '../contexts/interface'
import { ProjectsProvider } from '../contexts/projects'
import { UserProvider } from '../contexts/user'
import { globalStyles } from '../styles/global'
import { DefaultSeo } from 'next-seo'

import LogRocket from 'logrocket'
LogRocket.init('iaiad2/og')

globalStyles()

export default function App({
  Component,
  pageProps: {
    // session,
    ...pageProps
  },
}: AppProps) {
  return (
    // <SessionProvider session={session}>
    <InterfaceProvider>
      <UserProvider>
        <ProjectsProvider>
          <DefaultSeo
            openGraph={{
              type: 'website',
              locale: 'pt-br',
              url: 'https://ognare.com',
              siteName: 'Ognare',
              title: 'Ognare',
              description: 'A origem das suas ideias...',
            }}
            defaultTitle="Ognare"
            description="A origem das suas ideias..."
            title="Ognare"
          />

          <Component {...pageProps} />
        </ProjectsProvider>
      </UserProvider>
    </InterfaceProvider>
    // </SessionProvider>
  )
}
