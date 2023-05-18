import { styled } from '@styles/index'

export const TextInputContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '$3',

  padding: '$4',

  background: '$gray700',
  borderRadius: '$sm',
  boxSizing: 'border-box',
  transition: 'ease-in-out 250ms',

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
      noShadow: {
        boxShadow: 'unset',
      },
    },
    size: {
      xxs: { padding: '$1' },
      xs: { padding: '$2' },
      sm: { padding: '$3' },
      md: {},
      lg: { padding: '$5' },
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
  width: '100%',
  minWidth: '100%',
  height: '100%',

  background: '$transparent',
  border: 'none',
  outline: 'none',
  color: '$text800',
  cursor: 'pointer',
  fontFamily: '$bodyText',
  fontSize: '$lg',

  '&:disabled': {
    cursor: 'not-allowed',
  },

  '&::placeholder': {
    fontSize: '$md',
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
