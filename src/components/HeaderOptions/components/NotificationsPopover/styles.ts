import * as Popover from '@radix-ui/react-popover'
import { Box } from '@components/usefull/Box'
import { styled } from '@styles/index'

export const NotificationPopoverContainer = styled(Popover.Content, {
  zIndex: 2,
  position: 'static',
  display: 'flex',
  flexDirection: 'column',

  width: '420px',
  maxWidth: '100vw',
  maxHeight: '450px',

  borderRadius: '$sm',
  boxShadow:
    'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  border: '2px solid $purple400',

  variants: {
    darkMode: {
      true: {
        background: '$gray900',
      },
      false: {
        background: '$gray200',
      },
    },
  },

  defaultVariants: {
    darkMode: false,
  },
})

export const PopoverArrow = styled(Popover.Arrow, {
  fill: '$purple400',
})

export const PopoverClose = styled(Popover.Close, {
  position: 'absolute',
  zIndex: 2,

  top: '$3',
  right: '$3',

  lineHeight: 0,

  border: 0,
  outline: 0,
  borderRadius: '$full',
  background: 'transparent',
  cursor: 'pointer',
  color: '$base100',

  '&:active': {
    svg: {
      scale: '95%',
    },
  },
})

export const HeaderNotifications = styled('header', {
  display: 'flex',

  padding: '$3 $5',
  borderBottom: '0.5px solid $base900',
})

export const Notifications = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',
  height: '100%',

  overflowY: 'auto',
  padding: '$3',

  variants: {
    isEmpty: {
      true: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '80%',
        svg: {
          color: '$base800',
        },
      },
      false: {},
    },
  },

  defaultVariants: {
    isEmpty: true,
  },
})

export const Notification = styled(Box, {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: '$2',
  padding: '$3',

  boxShadow: '$none',
  transition: 'ease-in-out 250ms',

  h4: {
    display: 'flex',
    flexDirection: 'column',

    p: {
      color: '$base600',
    },
  },

  variants: {
    isVisualized: {
      false: {
        boxShadow: '$inFocus',
        background: '$blue800',
      },
    },
    darkMode: {
      true: {
        background: '$gray600',
        color: '$white',
      },
      false: {
        background: '$gray400',
        color: '$white',
      },
    },
  },

  defaultVariants: {
    darkMode: false,
  },
})
