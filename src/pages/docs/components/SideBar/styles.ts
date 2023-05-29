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
  transition: 'ease-in-out 250ms',

  '@media screen and (max-width: 768px)': {
    position: 'fixed',
    overflow: 'unset',

    width: '75%',
    maxWidth: '75%',
    boxShadow: '0 -16px 20px 6px #000000aa',
  },

  variants: {
    sideBarIsOpen: {
      true: {},
      false: {
        '@media screen and (max-width: 768px)': {
          left: '-75%',
          boxShadow: 'unset',
        },
      },
    },
  },
})

export const SideBarOpen = styled('button', {
  all: 'unset',
  zIndex: 1,
  position: 'absolute',
  lineHeight: 0,
  padding: '$1',
  right: '-$7',
  background: '$purple900',
  borderRadius: '0 $xxs $xxs 0',
  cursor: 'pointer',
  transition: 'ease-in-out 250ms',

  '&:hover': {
    background: '$purple800',
  },

  variants: {
    sideBarIsOpen: {
      true: {},
      false: {
        svg: {
          transform: 'rotate(180deg)',
        },
      },
    },
  },
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
  overflow: 'hidden',
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
