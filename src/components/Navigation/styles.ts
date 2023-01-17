import { styled } from '@og-ui/react'

export const NavigationBarContainer = styled('nav', {
  position: 'fixed',
  zIndex: '-1',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '$8',

  height: '100vh',
  width: '26%',
  padding: '$8',

  transition: 'all 500ms',
  background: '$gray900',
  overflowY: 'scroll',

  img: {
    objectFit: 'fill',
    height: 80,
    cursor: 'pointer',
  },

  '@media screen and (max-width: 768px)': {
    zIndex: '3',

    width: '100%',
  },

  variants: {
    navIsOpen: {
      true: {
        '@media screen and (max-width: 768px)': {
          left: '0',

          '.close': {
            display: 'flex',
          },
        },
      },
      false: {
        '@media screen and (max-width: 768px)': {
          left: '-100%',

          '.close': {
            display: 'none',
          },
        },
      },
    },
  },

  '.close': {
    position: 'absolute',
    display: 'none',

    top: '$5',
    right: '$5',

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
    '@media screen and (max-width: 768px)': {
      display: 'flex',
    },
  },
})

export const ButtonsContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$8',

  width: '100%',

  '@media screen and (max-width: 768px)': {
    gap: '$6',
  },
})
