import { createContext, ReactNode, useState, useEffect } from 'react'

interface IInterfaceContextProps {
  children: ReactNode
}

interface IInterfaceContext {
  navIsOpen: boolean
  setNavIsOpen(newState: boolean): void

  userOptionsIsOpen: boolean
  setUserOptionsIsOpen: (newState: boolean) => void

  notificationsIsOpen: boolean
  setNotificationsIsOpen: (newState: boolean) => void

  preferenciesIsOpen: boolean
  setPreferenciesIsOpen: (newState: boolean) => void

  newProjectIsOpen: boolean
  setNewProjectIsOpen: (newState: boolean) => void

  isList: boolean
  setIsList: (newState: boolean) => void

  navigatorProjectIsOpen: boolean
  setNavigatorProjectIsOpen: (newState: boolean) => void

  orderBy:
    | 'a-z'
    | 'z-a'
    | 'time-asc'
    | 'time-desc'
    | 'update-asc'
    | 'update-desc'
  setOrderBy: (
    newState:
      | 'a-z'
      | 'z-a'
      | 'time-asc'
      | 'time-desc'
      | 'update-asc'
      | 'update-desc',
  ) => void

  resetInterface: () => void
}

const interfaceDefaultsValues: IInterfaceContext = {
  navIsOpen: false,
  setNavIsOpen: (newState: boolean) => {},

  userOptionsIsOpen: false,
  setUserOptionsIsOpen: (newState: boolean) => {},

  notificationsIsOpen: false,
  setNotificationsIsOpen: (newState: boolean) => {},

  preferenciesIsOpen: false,
  setPreferenciesIsOpen: (newState: boolean) => {},

  newProjectIsOpen: false,
  setNewProjectIsOpen: (newState: boolean) => {},

  isList: false,
  setIsList: (newState: boolean) => {},

  navigatorProjectIsOpen: false,
  setNavigatorProjectIsOpen: (newState: boolean) => {},

  orderBy: 'time-asc',
  setOrderBy: (
    newState:
      | 'a-z'
      | 'z-a'
      | 'time-asc'
      | 'time-desc'
      | 'update-asc'
      | 'update-desc',
  ) => {},

  resetInterface: () => {},
}

export const InterfaceContext = createContext(interfaceDefaultsValues)

export function InterfaceProvider({ children }: IInterfaceContextProps) {
  const [navIsOpen, setNavIsOpen] = useState(interfaceDefaultsValues.navIsOpen)
  const [userOptionsIsOpen, setUserOptionsIsOpen] = useState(
    interfaceDefaultsValues.userOptionsIsOpen,
  )
  const [notificationsIsOpen, setNotificationsIsOpen] = useState(false)
  const [preferenciesIsOpen, setPreferenciesIsOpen] = useState(false)
  const [newProjectIsOpen, setNewProjectIsOpen] = useState(false)

  const [isList, setIsList] = useState(interfaceDefaultsValues.isList)
  const [orderBy, setOrderBy] = useState(interfaceDefaultsValues.orderBy)
  const [navigatorProjectIsOpen, setNavigatorProjectIsOpen] = useState(false)

  function resetInterface() {
    setNavIsOpen(false)
    setUserOptionsIsOpen(false)
    setNotificationsIsOpen(false)
    setPreferenciesIsOpen(false)
    setNewProjectIsOpen(false)
    setNavigatorProjectIsOpen(false)
  }

  useEffect(() => {
    const configInString = localStorage.getItem('@og-interface-config')

    if (!configInString) return
    const config = JSON.parse(configInString)

    setIsList(config.list)
    setOrderBy(config.orderBy || 'time-asc')
  }, [])

  useEffect(() => {
    const config = {
      list: isList,
      orderBy,
    }

    localStorage.setItem('@og-interface-config', JSON.stringify(config))
  }, [isList, orderBy])

  return (
    <InterfaceContext.Provider
      value={{
        navIsOpen,
        setNavIsOpen,

        userOptionsIsOpen,
        setUserOptionsIsOpen,

        notificationsIsOpen,
        setNotificationsIsOpen,

        preferenciesIsOpen,
        setPreferenciesIsOpen,

        newProjectIsOpen,
        setNewProjectIsOpen,

        isList,
        setIsList,

        orderBy,
        setOrderBy,

        navigatorProjectIsOpen,
        setNavigatorProjectIsOpen,

        resetInterface,
      }}
    >
      {children}
    </InterfaceContext.Provider>
  )
}
