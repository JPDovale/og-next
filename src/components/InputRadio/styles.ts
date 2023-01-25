import { Text, styled } from '@og-ui/react'
import * as RadioGroup from '@radix-ui/react-radio-group'

export const RadioRoot = styled(RadioGroup.Root, {
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',
  padding: '$4',
  borderRadius: '$xs',

  variants: {
    isInLine: {
      true: {
        flexDirection: 'row',
        gap: '$8',
      },
    },

    withColorInBackground: {
      true: {
        background: '$gray500',
      },
    },
  },
})

export const RadioItem = styled(RadioGroup.Item, {
  all: 'unset',
  width: 24,
  height: 24,

  borderRadius: '$full',
  background: '$gray900',
  cursor: 'pointer',
  boxShadow: '$onActive',
})

export const RadioSelected = styled(RadioGroup.Indicator, {
  borderRadius: '$full',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  position: 'relative',

  '&::after': {
    content: '',
    display: 'block',
    width: 24,
    height: 24,
    borderRadius: '$full',
    backgroundColor: '$purple500',
    boxShadow: '$default',
  },
})

export const RadioLabel = styled(Text, {
  display: 'flex',
  cursor: 'pointer',
  gap: '$2',

  span: {
    color: '$base800',
  },

  variants: {
    isSelected: {
      true: {
        span: {
          color: '$purple100',
        },
      },
    },

    isInLine: {
      true: {
        flexDirection: 'column',
      },
    },
  },
})
