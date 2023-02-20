import { styled, Text, TextInput } from '@og-ui/react'

export const CapituleCardContainer = styled('div', {
  all: 'unset',
  width: '100%',

  background: '$gray900',
  borderRadius: '$sm',
})

export const CapituleName = styled(Text, {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  padding: '$4',
  borderBottom: '$base800 1px solid',
})

export const CapituleInfos = styled('button', {
  all: 'unset',
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',

  padding: '$4',
  height: '100%',

  cursor: 'pointer',
})

export const CapituleComplete = styled(Text, {
  variants: {
    complete: {
      true: {
        color: '$successDefault',
      },
      false: {
        color: '$errorDefault',
      },
    },
  },
})

export const CapituleObjective = styled(Text, {
  textAlign: 'justify',
})

export const AlternativeFormContainer = styled('div', {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',
  width: '100%',
  height: '100%',

  padding: '$4',

  '.form': {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    gap: '$4',

    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -25%)',

    width: '75%',
    height: '100%',
  },

  button: {
    padding: '$3',
    boxShadow: 'none',
  },
})

export const WrittenWordsInput = styled(TextInput, {})

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
