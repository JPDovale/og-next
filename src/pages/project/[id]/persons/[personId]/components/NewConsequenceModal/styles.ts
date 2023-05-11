import { styled } from '@styles/index'

export const NewConsequenceForm = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$2',
  height: '100%',
  padding: '$4',

  overflowY: 'auto',
  borderRadius: '0 0 $md $md',

  variants: {
    darkMode: {
      true: {
        background: '$gray900',
      },
      false: {
        background: '$gray300',
      },
    },
  },

  defaultVariants: {
    darkMode: false,
  },
})
