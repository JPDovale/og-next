import { styled } from '@styles/index'

export const PersonsContainer = styled('div', {
  display: 'grid',
  gap: '$4',

  padding: '$4',

  variants: {
    isEmpty: {
      true: {
        gridTemplateColumns: 'repeat(1, 1fr)',
      },
      false: {
        gridTemplateColumns: 'repeat(3, 1fr)',
      },
    },
  },

  defaultVariants: {
    isEmpty: true,
  },
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
})

export const FastAccessPersons = styled('div', {
  padding: '$2',
  background: '$gray700',
  borderRadius: '$sm',

  '@media screen and (max-width: 768px)': {
    width: '90%',
  },
})
