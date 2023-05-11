import { darkMode } from '@styles/theme/dark'
import { lightMode } from '@styles/theme/light'
import { createContext, ReactNode, useState, useEffect } from 'react'

type ISetTheme = (newState: any | ((previousState: any) => any)) => void

interface IInterfaceContextProps {
  children: ReactNode

  setTheme: ISetTheme
  theme: 'dark' | 'light'
}

type IOrderBy =
  | 'a-z'
  | 'z-a'
  | 'time-asc'
  | 'time-desc'
  | 'update-asc'
  | 'update-desc'

interface IInterfaceContext {
  navIsOpen: boolean
  setNavIsOpen(newState: boolean): void

  isList: boolean
  setIsList: (newState: boolean) => void

  timelineIsOpen: boolean
  setTimelineIsOpen: (newState: boolean) => void

  navigatorProjectIsOpen: boolean
  setNavigatorProjectIsOpen: (newState: boolean) => void

  orderBy: IOrderBy
  setOrderBy: (newState: IOrderBy) => void

  setThemeFunction: () => void
  theme: 'dark' | 'light'

  resetInterface: () => void
}

export const InterfaceContext = createContext({} as IInterfaceContext)

export function InterfaceProvider({
  children,
  setTheme,
  theme,
}: IInterfaceContextProps) {
  const [loadingInterface, setLoadingInterface] = useState(true)
  const [navIsOpen, setNavIsOpen] = useState(false)
  const [timelineIsOpen, setTimelineIsOpen] = useState(true)
  const [isList, setIsList] = useState(false)
  const [orderBy, setOrderBy] = useState<IOrderBy>('a-z')
  const [navigatorProjectIsOpen, setNavigatorProjectIsOpen] = useState(false)

  function resetInterface() {
    setNavIsOpen(false)
    setNavigatorProjectIsOpen(false)
    setTimelineIsOpen(() => true)
    setTheme(lightMode)
  }

  function setThemeFunction() {
    setTheme((state: string) => {
      if (state === lightMode) {
        localStorage.setItem('@og-theme', 'dark')
      } else {
        localStorage.setItem('@og-theme', 'light')
      }

      return state === lightMode ? darkMode : lightMode
    })
  }

  useEffect(() => {
    const configInString = localStorage.getItem('@og-interface-config')
    const theme = localStorage.getItem('@og-theme')

    if (theme) {
      if (theme === 'dark') {
        setTheme(darkMode)
      } else {
        setTheme(lightMode)
      }
    }

    if (!configInString) return
    const config = JSON.parse(configInString)

    setIsList(config.list)
    setOrderBy(config.orderBy || 'time-asc')
    setTimelineIsOpen(config.timelineIsOpen)
    setLoadingInterface(false)
  }, [setTheme])

  useEffect(() => {
    const config = {
      list: isList,
      orderBy,
      timelineIsOpen,
    }

    localStorage.setItem('@og-interface-config', JSON.stringify(config))
  }, [isList, orderBy, timelineIsOpen])

  return (
    <InterfaceContext.Provider
      value={{
        navIsOpen,
        setNavIsOpen,

        isList,
        setIsList,

        timelineIsOpen,
        setTimelineIsOpen,

        orderBy,
        setOrderBy,

        navigatorProjectIsOpen,
        setNavigatorProjectIsOpen,

        setThemeFunction,
        theme,

        resetInterface,
      }}
    >
      {!loadingInterface && children}
    </InterfaceContext.Provider>
  )
}
