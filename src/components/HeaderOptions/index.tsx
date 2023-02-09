import { Heading, Text, TextInput } from '@og-ui/react'
import {
  ArrowFatLinesRight,
  BellSimple,
  DotsNine,
  FilePlus,
  MagnifyingGlass,
  XCircle,
} from 'phosphor-react'
import { useContext, useState } from 'react'
import { InterfaceContext } from '../../contexts/interface'
import { UserContext } from '../../contexts/user'
import { useWindowSize } from '../../hooks/useWindow'
import { AvatarWeb } from '../Avatar'
import { NewProjectPopup } from './components/NewProjectPopup'
import { NotificationsPopup } from './components/NotificationsPopup'
import { PreferenciesPopup } from './components/PreferenciesPopup'
import { UserOptionsPopup } from './components/UserOptionsPopup'
import {
  AddNewProjectButton,
  HeaderOptionsContainer,
  Loading,
  NewNotificationAlert,
  Options,
  QueryContainer,
  Title,
} from './styles'

interface IHeaderOptionsProps {
  windowName: string
  isLoading?: boolean

  query?: string
  setQuery?: (newState: string) => void

  queryless?: boolean
}

export function HeaderOptions({
  windowName,
  isLoading = false,

  query,
  setQuery,

  queryless = false,
}: IHeaderOptionsProps) {
  const [queryIsOpen, setQueryIsOpen] = useState(false)

  const { user, visualizeNotifications } = useContext(UserContext)
  const {
    userOptionsIsOpen,
    setUserOptionsIsOpen,
    navIsOpen,
    setNavIsOpen,
    notificationsIsOpen,
    setNotificationsIsOpen,
    preferenciesIsOpen,
    setPreferenciesIsOpen,
    newProjectIsOpen,
    setNewProjectIsOpen,
  } = useContext(InterfaceContext)

  const onPopUpOpen = !!(
    userOptionsIsOpen ||
    notificationsIsOpen ||
    preferenciesIsOpen ||
    newProjectIsOpen
  )

  const windowSize = useWindowSize()
  const smallWindow = windowSize.width! < 786

  const newNotifications = !!user?.notifications?.find(
    (notification) => notification.isVisualized === false,
  )
  const newNotificationsNumber = user?.notifications?.filter(
    (notification) => notification.isVisualized === false,
  ).length

  function closePopUp() {
    if (!onPopUpOpen) return
    setUserOptionsIsOpen(false)
    setNotificationsIsOpen(false)
    setPreferenciesIsOpen(false)
    setNewProjectIsOpen(false)
  }

  return (
    <>
      <HeaderOptionsContainer
        NavIsOpen={navIsOpen}
        onPopUp={onPopUpOpen}
        onClick={closePopUp}
      >
        {isLoading && <Loading />}
        <Title NavIsOpen={navIsOpen}>
          <ArrowFatLinesRight
            size="24"
            onClick={() => !onPopUpOpen && setNavIsOpen(!navIsOpen)}
          />
          <Heading
            as="span"
            css={{
              fontSize: '1.1rem',
            }}
          >
            {windowName.toUpperCase()}
          </Heading>
          {smallWindow && newNotifications && (
            <NewNotificationAlert inRight>
              <Text size="sm" family="body">
                {newNotificationsNumber}
              </Text>
            </NewNotificationAlert>
          )}
        </Title>
        <Options>
          <AddNewProjectButton
            icon={<FilePlus />}
            wid="hug"
            onClick={() => {
              setNavIsOpen(false)
              setNewProjectIsOpen(true)
            }}
          />

          <button
            type="button"
            className="icon-button"
            onClick={() => {
              setNavIsOpen(false)
              setPreferenciesIsOpen(true)
            }}
          >
            <DotsNine size={'24'} />
          </button>

          {!smallWindow && queryless && (
            <QueryContainer onQuery={queryIsOpen}>
              {queryIsOpen && (
                <TextInput
                  icon={<MagnifyingGlass size={24} />}
                  placeholder={'Procure por um projeto'}
                  value={query}
                  onChange={(e) => {
                    setQuery && setQuery(e.target.value)
                  }}
                />
              )}
              <button
                type="button"
                className="icon-button"
                onClick={() => {
                  setNavIsOpen(false)
                  setQueryIsOpen(!queryIsOpen)
                  setQuery && setQuery('')
                }}
              >
                {queryIsOpen ? (
                  <XCircle size={24} />
                ) : (
                  <MagnifyingGlass size={'24'} />
                )}
              </button>
            </QueryContainer>
          )}

          <button
            type="button"
            className="icon-button"
            onClick={() => {
              setNavIsOpen(false)
              setNotificationsIsOpen(true)

              setTimeout(() => {
                newNotifications && visualizeNotifications()
              }, 10000)
            }}
          >
            <BellSimple size={'24'} />
            {newNotifications && (
              <NewNotificationAlert>
                <Text size="sm" family="body">
                  {newNotificationsNumber}
                </Text>
              </NewNotificationAlert>
            )}
          </button>

          <button
            type="button"
            className="icon-button avatar"
            onClick={() => {
              setNavIsOpen(false)
              setUserOptionsIsOpen(true)
            }}
          >
            <AvatarWeb size="sm" src={user?.avatar?.url as string} />
          </button>
        </Options>
        {smallWindow && queryless && (
          <QueryContainer onQuery={queryIsOpen}>
            {queryIsOpen && (
              <TextInput
                icon={<MagnifyingGlass size={24} />}
                placeholder={'Procure por um projeto'}
                value={query}
                onChange={(e) => {
                  setQuery && setQuery(e.target.value)
                }}
              />
            )}
            <button
              type="button"
              className="icon-button"
              onClick={() => {
                setNavIsOpen(false)
                setQueryIsOpen(!queryIsOpen)
                setQuery && setQuery('')
              }}
            >
              {queryIsOpen ? (
                <XCircle size={18} />
              ) : (
                <MagnifyingGlass size={18} />
              )}
            </button>
          </QueryContainer>
        )}
      </HeaderOptionsContainer>
      {!isLoading && (
        <>
          <UserOptionsPopup />
          <NotificationsPopup
            notificationsIsOpen={notificationsIsOpen}
            setNotificationsIsOpen={setNotificationsIsOpen}
          />
          <PreferenciesPopup
            preferenciesIsOpen={preferenciesIsOpen}
            setPreferenciesIsOpen={setPreferenciesIsOpen}
          />
          {newProjectIsOpen && (
            <NewProjectPopup
              newProjectIsOpen={newProjectIsOpen}
              setNewProjectIsOpen={setNewProjectIsOpen}
            />
          )}
        </>
      )}
    </>
  )
}
