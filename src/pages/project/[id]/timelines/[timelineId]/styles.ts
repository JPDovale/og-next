import { styled } from '@styles/index'

export const EventCard = styled('button', {
  all: 'unset',
  display: 'flex',
  alignItems: 'center',
  padding: '$2',
  background: '$gray700',
  borderRadius: '$sm',
  boxShadow: '$default',
  transition: 'ease-in-out 250ms',
  cursor: 'pointer',

  '&:hover': {
    scale: 1.02,
  },

  '&:focus': {
    boxShadow: '$inFocus',
  },

  variants: {
    selected: {
      true: {
        background: '$gray700',
        boxShadow: '0 0 13px $colors$importance8',
      },
      false: {
        filter: 'blur(1px)',
      },
      none: {},
    },
    importance: {
      1: {
        border: '1px solid $importance1',
      },
      2: {
        border: '1px solid $importance2',
      },
      3: {
        border: '1px solid $importance3',
      },
      4: {
        border: '1px solid $importance4',
      },
      5: {
        border: '1px solid $importance5',
      },
      6: {
        border: '1px solid $importance6',
      },
      7: {
        border: '1px solid $importance7',
      },
      8: {
        border: '1px solid $importance8',
      },
      9: {
        border: '1px solid $importance9',
      },
      10: {
        border: '1px solid $importance10',
      },
    },
  },

  defaultVariants: {
    selected: false,
  },
})

export const EventImportance = styled('span', {
  padding: '$2',
  fontSize: '$lg',
  fontFamily: '$bodyText',
  textAlign: 'center',
  lineHeight: 0.5,
  borderRadius: '$full',

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

export const EventTime = styled('div', {
  borderRight: '1px solid $purple500',
  padding: '$2',
})

export const EventInfos = styled('div', {
  padding: '$2',
})
