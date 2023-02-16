import { Button, styled } from '@og-ui/react'

export const NewBookContainer = styled('div', {
  padding: '$4',
  height: '90%',
})

export const NewBookForm = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '$4',
  position: 'relative',

  padding: '$4',
  height: '100%',

  background: '$gray900',
  borderRadius: '$sm',
  overflowY: 'auto',
})

export const InputGroup = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '$4',

  width: '100%',

  variants: {
    columns: {
      1: {},
      2: {
        gridTemplateColumns: 'repeat(2, 1fr)',
      },
    },
  },
})

export const InputContainer = styled('label', {
  width: '100%',

  p: {
    display: 'flex',
    justifyContent: 'space-between',

    width: '100%',

    color: '$base800',

    span: {
      color: '$errorDefault',
    },
  },

  div: {
    padding: '$3',
  },
})

export const AddButton = styled(Button, {
  padding: '$2 $20',
  margin: 'auto',
  marginTop: '$4',
})

export const Generes = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(6, 1fr)',
  gap: '$2',

  '@media screen and (max-width: 768px)': {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },

  variants: {
    isEmpty: {
      true: {
        gridTemplateColumns: '1fr',
      },
    },
  },
})

export const GenereCard = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',

  height: 120,

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
