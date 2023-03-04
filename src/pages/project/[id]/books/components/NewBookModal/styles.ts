import { styled } from '@styles/index'

export const NewBookContainer = styled('div', {
  padding: '$4',

  background: '$gray900',
  borderRadius: '$md',
})

export const NewBookForm = styled('form', {
  padding: '$4 0',
})

export const GenereCard = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',

  height: 60,

  background: '$gray600',
  borderRadius: '$md',

  button: {
    all: 'unset',

    position: 'absolute',
    top: '$2',
    right: '$2',

    lineHeight: 0,

    cursor: 'pointer',
  },
})
