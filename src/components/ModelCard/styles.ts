import { styled } from '@styles/index'

export const ModelCardContainer = styled('button', {
  all: 'unset',

  display: 'flex',
  flexDirection: 'column',
  background: '$purple700',
  padding: '$4',
  gap: '$2',
  justifyContent: 'center',
  alignItems: 'center',

  // border: '1px solid $purple400',
  color: '$base100',
  cursor: 'pointer',
  transition: 'ease-in-out 250ms',
  borderRadius: '$sm',
  boxShadow: '$default',

  '&:not(:disabled):not(:active):hover': {
    scale: '105%',
  },

  '&:focus': {
    boxShadow: '$inFocus',
  },

  '&:not(:disabled):active': {
    scale: '95%',
    boxShadow: '$onActive',
  },

  '&:disabled': {
    cursor: 'not-allowed',
    opacity: 0.5,
  },

  '.icon': {
    svg: {
      width: '$8',
      height: '$8',
    },
  },
})
