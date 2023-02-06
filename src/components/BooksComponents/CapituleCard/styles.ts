import { styled, Text } from '@og-ui/react'

export const CapituleCardContainer = styled('button', {
  all: 'unset',
  width: '100%',

  background: '$gray900',
  borderRadius: '$sm',
  cursor: 'pointer',
})

export const CapituleName = styled(Text, {
  padding: '$4',
  borderBottom: '$base800 1px solid',
})

export const CapituleInfos = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',

  padding: '$4',
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
