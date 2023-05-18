import { ButtonRoot } from '@components/usefull/Button'
import { styled } from '@styles/index'

export const NewTimeEventForm = styled('form', {
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

export const ButtonImportance = styled(ButtonRoot, {
  variants: {
    importance: {
      1: {
        background: '$importance1',
      },
      2: {
        background: '$importance2',
      },
      3: {
        background: '$importance3',
      },
      4: {
        background: '$importance4',
      },
      5: {
        background: '$importance5',
      },
      6: {
        background: '$importance6',
      },
      7: {
        background: '$importance7',
      },
      8: {
        background: '$importance8',
      },
      9: {
        background: '$importance9',
      },
      10: {
        background: '$importance10',
      },
    },
  },
})
