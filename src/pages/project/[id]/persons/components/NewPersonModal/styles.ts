import { styled } from '@styles/index'

export const NewPersonForm = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$8',

  padding: '$4',
  height: 'auto',
  maxHeight: '980px',

  borderRadius: '0 0 $sm $sm',
  background: '$gray900',
  transition: 'ease-in-out 250ms',

  '@media screen and (max-width: 768px)': {
    maxHeight: '2090px',
    height: 'auto',
  },
})
