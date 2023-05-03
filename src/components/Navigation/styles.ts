import { styled } from '@styles/index'
export const NavigationBarContainer = styled('nav', {
  position: 'fixed',
  zIndex: '-1',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '$3',

  height: '100vh',
  width: '18%',
  padding: '$2',

  transition: 'ease-in-out 250ms',
  background: '$gray900',
  overflowY: 'scroll',
  overflowX: 'hidden',

  img: {
    objectFit: 'fill',
    height: 75,
    width: 'auto',
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
          width: '100%',

          '.close': {
            display: 'flex',
          },
        },
      },
      false: {
        width: '5%',
        padding: '$2',

        '@media screen and (max-width: 768px)': {
          '.close': {
            display: 'none',
          },
        },
      },
    },
    darkMode: {
      false: {
        img: {
          // filter: 'invert(1)',
        },
      },
      true: {},
    },
  },

  defaultVariants: {
    darkMode: false,
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
  gap: '$4',

  width: '100%',

  '@media screen and (max-width: 768px)': {
    gap: '$4',
  },
})
