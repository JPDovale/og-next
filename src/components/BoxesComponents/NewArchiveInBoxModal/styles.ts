import { styled } from '@styles/index'

export const NewArchiveForm = styled('form', {
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
        background: '$base400',
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
