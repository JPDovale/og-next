import { styled } from '@og-ui/react'

export const CapituleContainer = styled('div', {
  position: 'relative',
  padding: '$4',
  paddingTop: 0,
})

export const CapituleInfos = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',

  padding: '$4',

  background: '$gray900',
  borderRadius: '$sm',
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
