import { styled } from '@styles/index'

export const SideBarContainer = styled('aside', {
  display: 'flex',
  flexDirection: 'column',

  height: '100vh',
  minWidth: '18%',
  maxWidth: '18%',

  background: '$gray800',
  overflowY: 'auto',
  borderRight: '1px solid $purple500',
})

export const SideBarHeader = styled('div', {
  padding: '$2 $4',

  fontFamily: '$bodyText',
  fontSize: '$2xl',
  fontWeight: '$bold',
})

export const SideBarBlock = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$1',
  padding: '0 $4',
})

export const SideBarItem = styled('a', {
  all: 'unset',

  display: 'block',
  width: '100%',
  padding: '$1 $4',

  fontFamily: '$bodyText',
  fontSize: '$xl',
  cursor: 'pointer',
  borderRadius: '$sm 0 0 $sm',
  transition: 'ease-in-out 250ms',

  '&:hover': {
    background: '$purple500',
    color: '$text100',
  },

  '&:focus': {
    background: '$purple500',
    color: '$text100',
  },

  variants: {
    disabled: {
      true: {
        background: '$purple500',
        color: '$text100',
        cursor: 'not-allowed',
      },
      false: {},
    },
  },
})
