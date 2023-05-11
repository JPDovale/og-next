import { styled } from '@styles/index'

export const NewTraumaForm = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',
  marginTop: '$4',
})

export const NewConsequenceCard = styled('button', {
  all: 'unset',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',

  minHeight: '$40',
  height: '100%',

  background: '$gray700',
  borderRadius: '$sm',
  boxShadow: '$default',
  cursor: 'pointer',
  transition: 'ease-in-out 250ms',

  '&:hover': {
    scale: 1.01,
  },

  '&:focus': {
    scale: 1.02,
  },
})

export const ConsequenceCard = styled('div', {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  padding: '$2',

  minHeight: '$40',
  height: '100%',

  background: '$gray700',
  borderRadius: '$sm',
  boxShadow: '$default',
})

export const ExcludeButton = styled('button', {
  all: 'unset',
  position: 'absolute',
  cursor: 'pointer',
  transition: 'ease-in-out 250ms',
  top: '$3',
  right: '$3',
  lineHeight: 0,
  padding: '$1',
  borderRadius: '$xs',

  '&:focus': {
    boxShadow: '$onActive',
  },
})
