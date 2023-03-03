import { styled } from '@styles/index'

export const TextInputContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$3',

  padding: '$4',

  background: '$gray700',
  borderRadius: '$sm',
  boxSizing: 'border-box',
  transition: 'all 500ms',

  '&:has(input:focus)': {
    boxShadow: '$inFocus',
  },

  '&:has(input:disabled)': {
    opacity: '0.5',
    cursor: 'not-allowed',
  },

  variants: {
    variant: {
      default: {
        boxShadow: '$default',
      },
      accepted: {
        boxShadow: '$accepted',
      },
      denied: {
        boxShadow: '$denied',
      },
      attention: {
        boxShadow: '$attention',
      },
    },
  },

  defaultVariants: {
    variant: 'default',
  },
})

export const TextInputPrefixContainer = styled('span', {
  marginRight: -10,

  fontFamily: '$text',
  fontSize: '$xs',
  fontWeight: '$bold',

  color: '$base700',
  cursor: 'default',
})

export const Input = styled('input', {
  minWidth: '100%',
  height: '100%',

  background: '$transparent',
  border: 'none',
  outline: 'none',
  color: '$white',
  cursor: 'pointer',

  '&:disabled': {
    cursor: 'not-allowed',
  },

  '&::placeholder': {
    fontSize: '$xs',
  },
})

export const TextInputIconContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',

  svg: {
    width: '$4',
    height: '$4',
    color: '$base800',
    lineHeight: 0,
  },
})
