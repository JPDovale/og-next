import { styled } from '@styles/index'

export const ButtonContainer = styled('button', {
  display: 'flex',
  gap: '$2',
  alignItems: 'center',

  padding: '$4',

  background: '$purple600',
  color: '$white',
  border: 'none',
  outline: 'none',
  borderRadius: '$sm',
  transition: 'ease-in-out 250ms',

  '&:disabled': {
    cursor: 'not-allowed',
    opacity: 0.5,
  },

  variants: {
    align: {
      left: {
        justifyContent: 'flex-start',
      },
      center: {
        justifyContent: 'center',
      },
      right: {
        justifyContent: 'flex-end',
      },
    },
    wid: {
      full: {
        width: '100%',
      },
      hug: {
        width: 'max-content',
      },
      middle: {
        width: '50%',
      },
    },
    size: {
      xxs: {
        padding: '$1 $1',
      },
      xs: {
        padding: '$2 $2',
      },
      sm: {
        padding: '$3 $3',
      },
      md: {},
      lg: {
        padding: '$5 $5',
      },
      xl: {
        padding: '$6 $6',
      },
    },
    variant: {
      default: {
        '&:not(:disabled):not(:active):hover': {
          background: '$purple500',
        },

        '&:not(:active):focus': {
          boxShadow: '$inFocus',
        },

        '&:not(:disabled):active': {
          boxShadow: '$onActive',
        },

        cursor: 'pointer',
        boxShadow: '$default',
      },
      active: {
        background: '$purple800',
        color: '$base500',
        boxShadow: '$onActive',
      },

      noShadow: {
        '&:not(:disabled):not(:active):hover': {
          background: '$purple500',
        },

        '&:not(:active):focus': {
          boxShadow: '$inFocus',
        },

        cursor: 'pointer',
        boxShadow: 'unset',
      },
    },
    colorInvert: {
      true: {
        svg: {
          color: '$white',
        },
        color: '$white',
      },
      false: {},
    },
  },

  defaultVariants: {
    align: 'left',
    wid: 'full',
    variant: 'default',
    size: 'md',
    colorInvert: true,
  },
})

export const ButtonIconContainer = styled('div', {
  display: 'flex',
  alignItems: 'center',

  svg: {
    width: '$4',
    height: '$4',
    lineHeight: 0,
  },
})

export const ButtonLabelContainer = styled('label', {})
