import { styled } from '@styles/index'

export const NewTimeEventToDoForm = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',
  height: '100%',
  alignItems: 'center',
  padding: '$4',

  overflowY: 'auto',
  borderRadius: '0 0 $md $md',

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
