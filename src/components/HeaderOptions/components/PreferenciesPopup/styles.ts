import { styled } from '@styles/index'
export const PreferenciesPopupContainer = styled('div', {
  position: 'fixed',
  zIndex: 1,

  width: '35%',
  height: '100%',

  background: '$gray900',
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

export const HeaderPreferencies = styled('header', {
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

export const Options = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$5',

  padding: '$8',

  button: {
    padding: '$3 $4',
  },
})
