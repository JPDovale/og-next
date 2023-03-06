import * as Toast from '@radix-ui/react-toast'
import { keyframes, styled } from '@styles/index'

const hideAnimation = keyframes({
  '0%': {
    opacity: 1,
  },
  '100%': {
    opacity: 0,
  },
})

const slideIn = keyframes({
  '0%': {
    transform: 'translateX(calc(100% + 25px))',
  },
  '100%': {
    transform: 'translateX(0)',
  },
})

const swipeOut = keyframes({
  '0%': {
    transform: 'translateX(var(--radix-toast-swipe-end-x))',
  },
  '100%': {
    transform: 'translateX(calc(100% + 25))',
  },
})

export const ToastRoot = styled(Toast.Root, {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: '$2',

  padding: '$4',
  width: 360,
  height: 'auto',

  background: '$gray900',
  borderRadius: '$sm',
  boxShadow:
    'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  border: '2px solid $purple300',

  '@media screen and (max-width: 768px)': {
    width: 240,
  },

  "&[data-state='open']": {
    animation: `${slideIn} 250ms ease-in-out`,
  },

  "&[data-state='closed']": {
    animation: `${hideAnimation} 150ms ease-in-out`,
  },

  "&[data-state='end']": {
    animation: `${swipeOut} 150ms ease-in-out`,
  },
})

export const ToastTitle = styled(Toast.Title, {})

export const ToastDescription = styled(Toast.Description, {})

export const ToastClose = styled(Toast.Close, {
  all: 'unset',
  position: 'absolute',
  right: '$4',
})

export const ToastViewport = styled(Toast.Viewport, {
  position: 'fixed',
  bottom: '0',
  right: '0',
  display: 'flex',
  flexDirection: 'column',
  padding: 25,
  gap: '10px',
  width: '390px',
  maxWidth: '100vw',
  margin: 0,
  listStyle: 'none',
  zIndex: 2147483647,
  outline: 'none',

  '@media screen and (max-width: 768px)': {
    width: 280,
  },
})
