import { Box, styled } from '@og-ui/react'

export const NotificationPopupContainer = styled('div', {
  position: 'fixed',
  zIndex: 1,

  width: '35%',
  height: '100%',

  background: '$gray900',
  overflowY: 'scroll',

  transition: 'ease-in-out 250ms',

  variants: {
    onWindow: {
      true: {
        top: 0,
        right: 0,
      },
      false: {
        top: 0,
        right: '-35%',
        display: 'none',
      },
    },
  },

  defaultVariants: {
    onWindow: false,
  },
  '@media screen and (max-width: 768px)': {
    width: '100%',
  },
})

export const HeaderNotifications = styled('header', {
  position: 'relative',
  display: 'flex',

  padding: '$8',
  borderBottom: '0.5px solid $base900',

  '.close': {
    position: 'absolute',

    top: '$8',
    right: '$8',

    lineHeight: 0,

    border: 0,
    outline: 0,
    borderRadius: '$full',
    background: 'transparent',
    cursor: 'pointer',
    color: '$base100',

    '&:focus': {
      boxShadow: '$inFocus',
    },
    '&:active': {
      svg: {
        scale: '95%',
      },
    },
  },
})

export const Notifications = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',

  overflowY: 'scroll',
  padding: '$8 $4',

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
  gap: '$4',

  background: '$purple700',
  boxShadow: '$onActive',

  button: {
    position: 'absolute',
    lineHeight: 0,

    top: '$4',
    right: '$4',

    border: 0,
    outline: 0,
    color: '$base100',
    background: 'transparent',
    cursor: 'pointer',

    '&:focus': {
      boxShadow: '$inFocus',
    },
  },

  h4: {
    display: 'flex',
    alignItems: 'center',

    justifyContent: 'space-between',
  },
})
