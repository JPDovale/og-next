import { styled } from '@styles/index'

export const CardTagBox = styled('div', {
  position: 'relative',

  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '$2',
  width: '100%',
  color: '$text100',

  borderRadius: '$sm',
  background: '$purple400',
})

export const RemoveButton = styled('button', {
  all: 'unset',
  cursor: 'pointer',
  lineHeight: 0,

  '&:hover': {
    scale: 1.02,
  },
})
