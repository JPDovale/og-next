import { styled } from '@styles/index'

export const CardBoxNotInternalContainer = styled('button', {
  all: 'unset',

  display: 'flex',
  flexDirection: 'column',
  gap: '$4',

  padding: '$4',

  borderRadius: '$sm',
  background: '$gray500',
  boxShadow: '$default',
  cursor: 'pointer',
  transition: 'ease-in-out 250ms',

  '&:hover': {
    scale: '102%',
  },

  '&:focus': {
    boxShadow: '$inFocus',
  },

  '&:active': {
    scale: '99%',
  },
})

export const CardTagBox = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  borderRadius: '$sm',
  background: '$purple400',
})
