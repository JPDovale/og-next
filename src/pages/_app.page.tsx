import type { AppProps } from 'next/app'

import * as Toast from '@radix-ui/react-toast'
import { InterfaceProvider } from '../contexts/interface'
import { ProjectsProvider } from '../contexts/projects'
import { UserProvider } from '../contexts/user'
import { globalStyles } from '../styles/global'
import { DefaultSeo } from 'next-seo'

import LogRocket from 'logrocket'
import { ToastViewport } from '@components/usefull/Toast/styles'
import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { useState } from 'react'
import { lightMode } from '@styles/theme/light'

LogRocket.init('iaiad2/og')

const queryClient = new QueryClient()

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState(lightMode)

  const timeScreenToast = 1000 * 10 // 10 segundos

  return (
    <QueryClientProvider client={queryClient}>
      <Toast.Provider
        swipeDirection="down"
        label="Notificação"
        duration={timeScreenToast}
      >
        <InterfaceProvider
          setTheme={setTheme}
          theme={theme === lightMode ? 'light' : 'dark'}
        >
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
              <div className={theme}>
                <Component {...pageProps} />
              </div>
            </ProjectsProvider>
          </UserProvider>
        </InterfaceProvider>

        <ToastViewport />
      </Toast.Provider>

      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
