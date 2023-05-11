import { styled } from '@styles/index'

export const ObjectiveContainer = styled('button', {
  all: 'unset',
  display: 'flex',
  flexDirection: 'column',

  padding: '$4',

  background: '$gray900',
  borderRadius: '$sm',
  boxShadow: '$default',
  cursor: 'pointer',
  transition: 'ease-in-out 250ms',

  '&:hover': {
    scale: 1.01,
    filter: 'unset',
  },

  '&:focus': {
    scale: 1.01,
    filter: 'unset',
  },

  variants: {
    selected: {
      false: {
        filter: 'blur(2px)',
      },
      true: {},
    },
  },

  defaultVariants: {
    selected: false,
  },
})
