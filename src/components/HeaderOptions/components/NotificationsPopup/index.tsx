import lodash from 'lodash'
import { useContext } from 'react'
import { Text } from '@og-ui/react'
import { EnvelopeOpen, XCircle } from 'phosphor-react'
import {
  HeaderNotifications,
  Notification,
  NotificationPopupContainer,
  Notifications,
} from './styles'
import { UserContext } from '@contexts/user'
import { IReverbKeys, reverbKeys } from '@services/reverbKeys'

interface INotificationsPopupProps {
  notificationsIsOpen: boolean
  setNotificationsIsOpen: (newState: boolean) => void
}

export function NotificationsPopup({
  notificationsIsOpen,
  setNotificationsIsOpen,
}: INotificationsPopupProps) {
  const { user } = useContext(UserContext)

  const notificationInHourOrd = lodash
    .sortBy(user?.notifications, (notification) => {
      const dateSepare = notification.createAt.split(' ')[0].split('/')
      const dateInFormat = `${dateSepare[1]}/${dateSepare[0]}/${dateSepare[2]}`

      return new Date(dateInFormat)
    })
    .reverse()

  // notificationInHourOrd.forEach((not) => {
  //   const dateOfElement = dayjs(not.createAt.split(' ')[0])
  //   const date = dateOfElement.format('MM/DD/YYYY')

  //   console.log(date, dateOfElement)
  //   console.log(new Date(date))
  // })

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
      <Notifications isEmpty={user?.notifications && !user?.notifications[0]}>
        {user?.notifications ? (
          notificationInHourOrd?.map((notification, i) => {
            const [pre, comment] = notification.content.split(':')
            const commentedIn =
              reverbKeys[`${pre.split('|')[1]}` as IReverbKeys]
            const prefix = `${pre.split('|')[0]} ${commentedIn || ''}`

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
