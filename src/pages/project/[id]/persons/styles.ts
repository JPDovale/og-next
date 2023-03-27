import { styled } from '@styles/index'

export const PersonsContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$8',

  padding: '$4',
})

export const NewPersonFormContainer = styled('div', {
  padding: '$4',
  position: 'relative',
})

export const QueryInputContainer = styled('div', {
  zIndex: 0,
  display: 'flex',
  position: 'absolute',
  width: '50%',

  '@media screen and (max-width: 768px)': {
    width: '75%',
  },

  div: {
    background: '$gray500',
    width: '100%',
  },
})

export const FastAccessPersons = styled('div', {
  padding: '$4',
  boxShadow: '$onActive',
  width: '98%',
  margin: 'auto',
  background: '$gray900',
  borderRadius: '$sm',
  marginTop: '$8',

  p: {
    color: '$base700',
  },

  '@media screen and (max-width: 768px)': {
    width: '90%',
  },
})
