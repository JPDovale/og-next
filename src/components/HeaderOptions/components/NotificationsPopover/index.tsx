import * as Popover from '@radix-ui/react-popover'
import lodash from 'lodash'
import { useContext } from 'react'
import { EnvelopeOpen, X } from 'phosphor-react'
import {
  HeaderNotifications,
  Notification,
  NotificationPopoverContainer,
  Notifications,
  PopoverArrow,
  PopoverClose,
} from './styles'
import { UserContext } from '@contexts/user'
import { IReverbKeys, reverbKeys } from '@services/reverbKeys'
import { Text } from '@components/usefull/Text'

export function NotificationsPopover() {
  const { user } = useContext(UserContext)

  const notificationInHourOrd = lodash
    .sortBy(user?.notifications, (notification) => {
      const dateSepare = notification.createAt.split(' ')[0].split('/')
      const dateInFormat = `${dateSepare[1]}/${dateSepare[0]}/${dateSepare[2]}`

      return new Date(dateInFormat)
    })
    .reverse()

  return (
    <Popover.Portal>
      <NotificationPopoverContainer>
        <PopoverArrow />

        <PopoverClose>
          <X size={20} />
        </PopoverClose>

        <HeaderNotifications>
          <Text as={'h3'} size={'lg'}>
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
      </NotificationPopoverContainer>
    </Popover.Portal>
  )
}
