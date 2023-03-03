import * as Checkbox from '@radix-ui/react-checkbox'
import { keyframes, styled } from '@styles/index'

export const CheckboxContainer = styled(Checkbox.Root, {
  all: 'unset',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  lineHeight: 0,

  width: '$6',
  height: '$6',

  background: '$gray700',
  cursor: 'pointer',
  borderRadius: '$xs',
  transition: 'all, 500ms',
  boxSizing: 'border-box',
  overflow: 'hidden',

  '&:focus': {
    boxShadow: '$inFocus',
  },

  '&[data-state="checked"]': {
    background: '$purple200',
  },

  variants: {
    variant: {
      default: {
        boxShadow: 'none',
      },
      denied: {
        boxShadow: '$denied',
      },
    },
  },

  defaultVariants: {
    variant: 'default',
  },
})

const slideIn = keyframes({
  from: {
    transform: 'translateY(-100%)',
  },
  to: {
    transform: 'translateY(0%)',
  },
})

const slideOut = keyframes({
  from: {
    transform: 'translateY(0%)',
  },
  to: {
    transform: 'translateY(100%)',
  },
})

export const CheckboxIndicator = styled(Checkbox.Indicator, {
  color: '$purple900',
  width: '$4',
  height: '$4',

  '&[data-state="checked"]': {
    animation: `${slideIn} 200ms ease-in-out`,
  },

  '&[data-state="unchecked"]': {
    animation: `${slideOut} 200ms ease-in-out`,
  },
})
