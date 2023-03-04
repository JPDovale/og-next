import type { AppProps } from 'next/app'

import * as Toast from '@radix-ui/react-toast'
import { InterfaceProvider } from '../contexts/interface'
import { ProjectsProvider } from '../contexts/projects'
import { UserProvider } from '../contexts/user'
import { globalStyles } from '../styles/global'
import { DefaultSeo } from 'next-seo'

import LogRocket from 'logrocket'
import { ToastViewport } from '@components/usefull/Toast/styles'
LogRocket.init('iaiad2/og')

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  const timeScreenToast = 1000 * 15 // 15 segundos

  return (
    <Toast.Provider
      swipeDirection="down"
      label="Notificação"
      duration={timeScreenToast}
    >
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

      <ToastViewport />
    </Toast.Provider>
  )
}
