import { useContext } from 'react'
import { Text } from '@og-ui/react'
import { EnvelopeOpen, XCircle } from 'phosphor-react'
import { UserContext } from '../../../../contexts/user'
import {
  HeaderNotifications,
  Notification,
  NotificationPopupContainer,
  Notifications,
} from './styles'
import { Error } from '../../../Error'
import { reverbKeys } from '../../../../services/reverbKeys'
import { Loading } from '../../../Loading'

interface INotificationsPopupProps {
  notificationsIsOpen: boolean
  setNotificationsIsOpen: (newState: boolean) => void
}

export function NotificationsPopup({
  notificationsIsOpen,
  setNotificationsIsOpen,
}: INotificationsPopupProps) {
  const { user, loading } = useContext(UserContext)

  if (loading) return <Loading />
  if (!user) return <Error />

  const notificationInHourOrd = user?.notifications?.slice().sort((a, b) =>
    a.createAt
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') <
    b.createAt
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      ? 1
      : b.createAt
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '') <
        a.createAt
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
      ? -1
      : 0,
  )

  return (
    <NotificationPopupContainer onWindow={notificationsIsOpen}>
      <HeaderNotifications>
        <button
          className="close"
          type="button"
          onClick={() => setNotificationsIsOpen(false)}
        >
          <XCircle size={32} />
        </button>
        <Text as={'h3'} size={'lg'} weight={'bold'} spacing={'maximum'}>
          Notificações
        </Text>
      </HeaderNotifications>
      <Notifications isEmpty={user.notifications && !user.notifications[0]}>
        {user.notifications ? (
          notificationInHourOrd.map((notification, i) => {
            const [pre, comment] = notification.content.split(':')
            const commentedIn = reverbKeys(pre.split('|')[1])
            const prefix = `${pre.split('|')[0]} ${commentedIn}`

            return (
              <Notification
                key={notification.id}
                isVisualized={notification.isVisualized}
              >
                <Text as="h4">
                  <Text as="span" size="sm" spacing="minimus">
                    {notification.title}
                  </Text>
                  <Text size="xxs">{notification?.createAt}</Text>
                </Text>
                <Text family={'body'} height={'short'}>
                  {prefix} {comment && ':' + comment}
                </Text>
              </Notification>
            )
          })
        ) : (
          <>
            <EnvelopeOpen size={80} />
            <Text family={'body'} size={'xl'} spacing={'medium'}>
              Sua caixa de notificações está vazia!
            </Text>
          </>
        )}
      </Notifications>
    </NotificationPopupContainer>
  )
}
