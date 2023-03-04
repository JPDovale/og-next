import * as Popover from '@radix-ui/react-popover'
import * as Dialog from '@radix-ui/react-dialog'
import { AvatarWeb } from '@components/usefull/Avatar'
import {
  TextInputIcon,
  TextInputInput,
  TextInputRoot,
} from '@components/usefull/InputText'
import { Text } from '@components/usefull/Text'
import { InterfaceContext } from '@contexts/interface'
import { UserContext } from '@contexts/user'
import { useWindowSize } from '@hooks/useWindow'
import {
  ArrowFatLinesRight,
  BellSimple,
  DotsNine,
  FilePlus,
  MagnifyingGlass,
  XCircle,
} from 'phosphor-react'
import { ChangeEvent, useContext, useState } from 'react'
import {
  HeaderOptionsContainer,
  Loading,
  NewNotificationAlert,
  Options,
  QueryContainer,
  Title,
} from './styles'
import { NewProjectModal } from './components/NewProjectModal'
import { PreferenciesPopover } from './components/PreferenciesPopover'
import { NotificationsPopover } from './components/NotificationsPopover'
import { UserOptionsPopover } from './components/UserOptionsPopover'

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
  const { navIsOpen, setNavIsOpen } = useContext(InterfaceContext)

  const windowSize = useWindowSize()
  const smallWindow = windowSize.width! < 786

  const newNotifications = !!user?.notifications?.find(
    (notification) => notification.isVisualized === false,
  )
  const newNotificationsNumber = user?.notifications?.filter(
    (notification) => notification.isVisualized === false,
  ).length

  return (
    <HeaderOptionsContainer NavIsOpen={navIsOpen}>
      {isLoading && <Loading />}

      <Title NavIsOpen={navIsOpen}>
        <ArrowFatLinesRight
          size={smallWindow ? 20 : 24}
          onClick={() => setNavIsOpen(!navIsOpen)}
        />
        <Text family="headingText" as="span" size={smallWindow ? 'xs' : 'md'}>
          {windowName.toUpperCase()}
        </Text>
      </Title>

      <Options>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button type="button" className="icon-button">
              <FilePlus size={24} />
            </button>
          </Dialog.Trigger>

          <NewProjectModal />
        </Dialog.Root>

        <Popover.Root>
          <Popover.Trigger asChild>
            <button type="button" className="icon-button">
              <DotsNine size={'24'} />
            </button>
          </Popover.Trigger>

          <PreferenciesPopover />
        </Popover.Root>

        {!smallWindow && queryless && (
          <QueryContainer onQuery={queryIsOpen}>
            {queryIsOpen && (
              <TextInputRoot
                css={{
                  padding: '$2',
                  boxShadow: 'none',
                  background: '$gray500',
                }}
              >
                <TextInputIcon>
                  <MagnifyingGlass size={24} />
                </TextInputIcon>

                <TextInputInput
                  placeholder={'Procure por um projeto'}
                  value={query}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setQuery && setQuery(e.target.value)
                  }}
                />
              </TextInputRoot>
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

        <Popover.Root>
          <Popover.Trigger asChild>
            <button
              type="button"
              className="icon-button"
              onClick={() => {
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
          </Popover.Trigger>

          <NotificationsPopover />
        </Popover.Root>

        <Popover.Root>
          <Popover.Trigger asChild>
            <button type="button" className="icon-button avatar">
              <AvatarWeb
                size={smallWindow ? '2xs' : 'xsm'}
                src={user?.avatar?.url as string}
              />
            </button>
          </Popover.Trigger>

          <UserOptionsPopover />
        </Popover.Root>
      </Options>
    </HeaderOptionsContainer>
  )
}
