import { styled } from '@styles/index'

export const ShareForm = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  padding: '$4',
  gap: '$4',

  background: '$gray900',
  borderRadius: '0 0 $md $md',
  overflowY: 'auto',
  height: '100%',

  button: {
    alignSelf: 'center',
  },

  variants: {
    darkMode: {
      true: {
        background: '$gray900',
      },
      false: {
        background: '$base400',
      },
    },
  },

  defaultVariants: {
    darkMode: false,
  },
})
