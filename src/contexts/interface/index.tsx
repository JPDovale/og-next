import { createContext, ReactNode, useState, useEffect } from 'react'

interface IInterfaceContextProps {
  children: ReactNode
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

  navigatorProjectIsOpen: boolean
  setNavigatorProjectIsOpen: (newState: boolean) => void

  orderBy: IOrderBy
  setOrderBy: (newState: IOrderBy) => void

  resetInterface: () => void
}

export const InterfaceContext = createContext({} as IInterfaceContext)

export function InterfaceProvider({ children }: IInterfaceContextProps) {
  const [navIsOpen, setNavIsOpen] = useState(false)

  const [isList, setIsList] = useState(false)
  const [orderBy, setOrderBy] = useState<IOrderBy>('a-z')
  const [navigatorProjectIsOpen, setNavigatorProjectIsOpen] = useState(false)

  function resetInterface() {
    setNavIsOpen(false)
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
