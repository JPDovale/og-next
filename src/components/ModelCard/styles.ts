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

  '&:hover': {
    scale: '105%',
  },

  '&:focus': {
    boxShadow: '$inFocus',
  },

  '&:active': {
    scale: '95%',
    boxShadow: '$onActive',
  },

  '.icon': {
    svg: {
      width: '$8',
      height: '$8',
    },
  },
})
