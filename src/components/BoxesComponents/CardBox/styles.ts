import { styled } from '@styles/index'

export const CardBoxContainer = styled('button', {
  all: 'unset',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '$4',

  borderRadius: '$md',
  background: '$gray500',
  border: '1px solid $purple500',
  boxShadow: 'inset 5px 5px 4px #00000090',
  cursor: 'pointer',
  transition: 'ease-in-out 250ms',

  '&:hover': {
    scale: '1.02',
  },
})
