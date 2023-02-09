import { styled, Text, TextInput } from '@og-ui/react'

export const SceneCardContainer = styled('div', {
  width: '100%',
  minHeight: '360px',

  background: '$gray900',
  borderRadius: '$md',
})

export const SceneHeading = styled(Text, {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '$4',
  borderBottom: '$base800 1px solid',
})

export const SceneContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$2',

  padding: '$4',
  height: '100%',
})

export const SceneCompleteAndObjective = styled('div', {
  display: 'grid',
  gridTemplateColumns: '9fr 1fr',

  width: '100%',

  variants: {
    complete: {
      true: {
        '.complete': {
          color: '$successDefault',
        },
      },
      false: {
        '.complete': {
          color: '$errorDefault',
        },
      },
    },
  },
})

export const CheckedScene = styled('div', {
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
