import { Button, styled, Text, TextInput } from '@og-ui/react'

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

export const NewPersonForm = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$8',

  padding: '$4',
  height: 'auto',
  maxHeight: '980px',

  borderRadius: '$sm',
  background: '$gray900',
  boxShadow: '$onActive',
  transition: 'ease-in-out 250ms',

  variants: {
    formIsVisible: {
      false: {
        padding: '0',
        maxHeight: '0',
        marginBottom: '$4',

        'button[type="submit"]': {
          display: 'none',
        },
      },
      true: {},
    },
  },

  '@media screen and (max-width: 768px)': {
    maxHeight: '2090px',
    height: 'auto',
  },
})

export const NewInfosPerson = styled('div', {
  display: 'flex',
  gap: '$4',

  width: '100%',

  '@media screen and (max-width: 768px)': {
    flexDirection: 'column',
  },
})

export const InfosBasics = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',

  width: '100%',
})

export const ShowFormButton = styled(Button, {
  position: 'absolute',

  padding: '$2',
  right: '$6',
  top: '$6',

  variants: {
    formIsVisible: {
      false: {
        right: '$4',
        top: '$4',
      },
      true: {},
    },
  },
})

export const InputForm = styled(Text, {
  display: 'flex',
  flexDirection: 'column',

  width: '100%',

  opacity: '1',
  transition: 'ease-in-out 250ms',

  textarea: {
    minHeight: '220px',
    height: '100%',
    resize: 'none',
  },

  variants: {
    formIsVisible: {
      false: {
        display: 'none',
        opacity: '0.1',
      },
      true: {},
    },
  },
})

export const InputHeader = styled(Text, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',

  [`> ${Text}`]: {
    color: '$base700',
    lineHeight: 0,
  },
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
    padding: '$2',
    width: '100%',
  },

  variants: {
    formIsVisible: {
      false: {},
      true: {
        display: 'none',
      },
    },
  },
})

export const QueryInput = styled(TextInput, {})

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
