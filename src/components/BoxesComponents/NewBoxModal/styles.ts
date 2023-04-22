import { styled } from '@styles/index'

export const NewBoxForm = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$8',

  padding: '$4',
  height: 'auto',
  maxHeight: '980px',

  borderRadius: '0 0 $sm $sm',
  background: '$gray900',
  transition: 'ease-in-out 250ms',

  variants: {
    darkMode: {
      true: {
        background: '$gray900',
        color: '$white',
      },
      false: {
        background: '$gray300',
      },
    },
  },

  defaultVariants: {
    darkMode: false,
  },

  '@media screen and (max-width: 768px)': {
    maxHeight: '2090px',
    height: 'auto',
  },
})

export const TagCard = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',

  height: 40,

  background: '$gray600',
  borderRadius: '$sm',

  button: {
    all: 'unset',

    position: 'absolute',
    top: '$2',
    right: '$2',

    lineHeight: 0,

    cursor: 'pointer',
  },
})
