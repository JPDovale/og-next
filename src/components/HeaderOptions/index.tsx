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
import { useWindowSize } from '@hooks/useWindow'
import {
  ArrowFatLinesRight,
  BellSimple,
  DotsNine,
  FilePlus,
  MagnifyingGlass,
  Package,
  Star,
  XCircle,
} from 'phosphor-react'
import { ChangeEvent, useContext, useState } from 'react'
import {
  HeaderOptionsContainer,
  Loading,
  NewNotificationAlert,
  Options,
  QueryContainer,
  Space,
  Title,
} from './styles'
import { PreferenciesPopover } from './components/PreferenciesPopover'
import { NotificationsPopover } from './components/NotificationsPopover'
import { UserOptionsPopover } from './components/UserOptionsPopover'
import { NewProjectModal } from '@components/ProjectsComponents/NewProjectModal'
import { NewBoxModal } from '@components/BoxesComponents/NewBoxModal'
import { useUser } from '@hooks/useUser'
import pk from '../../../package.json'
import { visualizeNotificationsRequest } from '@api/userRequest'
import Link from 'next/link'

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
  const [modalCreateProjectIsOpen, setModalCreateProjectIsOpen] =
    useState(false)

  const { navIsOpen, setNavIsOpen } = useContext(InterfaceContext)

  const { user, userIsPro, refetchUser } = useUser()

  const windowSize = useWindowSize()
  const smallWindow = windowSize.width! < 786

  const newNotifications =
    user?.account.notification.numberNew !== undefined &&
    user?.account.notification.numberNew !== 0
  const newNotificationsNumber = user?.account.notification.numberNew

  async function handleVisualizeNotifications() {
    await visualizeNotificationsRequest()
    refetchUser()
  }

  return (
    <>
      <HeaderOptionsContainer NavIsOpen={navIsOpen}>
        {isLoading && <Loading />}

        <Title NavIsOpen={navIsOpen}>
          <ArrowFatLinesRight
            className="arrow"
            size={smallWindow ? 20 : 24}
            onClick={() => setNavIsOpen(!navIsOpen)}
          />

          <Text
            family="headingText"
            as="span"
            css={{ display: 'flex', gap: '$2', alignItems: 'center' }}
            size={smallWindow ? 'xs' : 'md'}
          >
            {userIsPro && (
              <Star weight="fill" alt="Usuário pro" size={20} color="#f97700" />
            )}
            {windowName.toUpperCase()}
          </Text>
        </Title>

        <Options>
          <Link href="/docs/versions" style={{ width: '100%' }}>
            <Text
              css={{
                lineHeight: 0,
                opacity: 0.6,
                cursor: 'pointer',
                transition: 'ease-in-out 250ms',
                '&:hover': { opacity: 1, scale: 1.02 },
              }}
              family="body"
            >
              Versão: {pk.version} Beta
            </Text>
          </Link>

          <Dialog.Root>
            <Dialog.Trigger asChild>
              <button
                type="button"
                className="icon-button"
                disabled={isLoading}
              >
                <Package size={24} />
              </button>
            </Dialog.Trigger>

            <NewBoxModal />
          </Dialog.Root>

          <Dialog.Root
            open={modalCreateProjectIsOpen}
            onOpenChange={setModalCreateProjectIsOpen}
          >
            <Dialog.Trigger asChild>
              <button
                type="button"
                className="icon-button"
                disabled={isLoading}
              >
                <FilePlus size={24} />
              </button>
            </Dialog.Trigger>

            <NewProjectModal
              onSuccessCreateProject={() => setModalCreateProjectIsOpen(false)}
            />
          </Dialog.Root>

          <Popover.Root>
            <Popover.Trigger asChild>
              <button
                type="button"
                className="icon-button"
                disabled={isLoading}
              >
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
                    padding: '$1',
                    boxShadow: 'none',
                    background: '$gray500',
                    width: '100%',
                  }}
                  disabled={isLoading}
                >
                  <TextInputIcon>
                    <MagnifyingGlass size={24} />
                  </TextInputIcon>

                  <TextInputInput
                    placeholder={'Procure por um projeto'}
                    value={query}
                    css={{ minWidth: '100%' }}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      setQuery && setQuery(e.target.value)
                    }}
                  />
                </TextInputRoot>
              )}
              <button
                type="button"
                className="icon-button"
                disabled={isLoading}
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
                disabled={isLoading}
                onClick={() => {
                  setTimeout(() => {
                    newNotifications && handleVisualizeNotifications()
                  }, 10000)
                }}
              >
                <BellSimple size={'24'} />
                {newNotifications && (
                  <NewNotificationAlert>
                    <Text size="sm" family="body" colorInvert>
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
              <button
                type="button"
                className="icon-button avatar"
                disabled={isLoading}
              >
                <AvatarWeb
                  size={smallWindow ? '2xs' : 'xsm'}
                  src={user?.infos.avatar.url}
                  alt={user?.infos.avatar.alt}
                />
              </button>
            </Popover.Trigger>

            <UserOptionsPopover />
          </Popover.Root>
        </Options>
      </HeaderOptionsContainer>
      <Space />
    </>
  )
}
