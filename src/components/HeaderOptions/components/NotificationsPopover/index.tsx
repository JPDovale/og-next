import * as Popover from '@radix-ui/react-popover'
import lodash from 'lodash'
import { EnvelopeOpen, X } from 'phosphor-react'
import {
  HeaderNotifications,
  Notification,
  NotificationPopoverContainer,
  Notifications,
  PopoverArrow,
  PopoverClose,
} from './styles'
import { Text } from '@components/usefull/Text'
import { getDate } from '@utils/dates/getDate'
import { useUser } from '@hooks/useUser'
import { useContext } from 'react'
import { InterfaceContext } from '@contexts/interface'

export function NotificationsPopover() {
  const { user } = useUser()

  const { theme } = useContext(InterfaceContext)

  const notificationInHourOrd = lodash
    .sortBy(
      user?.account.notification.notifications,
      (notification) => notification.created_at,
    )
    .reverse()

  const isDarkMode = theme === 'dark'

  return (
    <Popover.Portal>
      <NotificationPopoverContainer darkMode={isDarkMode}>
        <PopoverArrow />

        <PopoverClose>
          <X size={20} />
        </PopoverClose>

        <HeaderNotifications>
          <Text
            as={'h3'}
            size={'lg'}
            css={{ color: isDarkMode ? '$base100' : '' }}
          >
            Notificações
          </Text>
        </HeaderNotifications>

        <Notifications isEmpty={!user?.account.notification.notifications[0]}>
          {user?.account.notification.notifications.length !== 0 ? (
            notificationInHourOrd?.map((notification, i) => {
              const createdAt = notification.created_at
                ? getDate(notification.created_at)
                : ''

              return (
                <Notification
                  key={notification.id}
                  isVisualized={true}
                  darkMode={isDarkMode}
                >
                  <Text as="h4">
                    <Text as="span" size="sm" spacing="minimus">
                      {notification.title}
                    </Text>
                    <Text size="xxs">{createdAt}</Text>
                  </Text>
                  <Text family={'body'} height={'short'}>
                    {notification.content}
                  </Text>
                </Notification>
              )
            })
          ) : (
            <>
              <EnvelopeOpen size={80} />
              <Text size="sm" spacing="medium" css={{ text: 'center' }}>
                Sua caixa de notificações está vazia!
              </Text>
            </>
          )}
        </Notifications>
      </NotificationPopoverContainer>
    </Popover.Portal>
  )
}
