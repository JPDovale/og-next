import { styled } from '@styles/index'

export const CalendarBody = styled('table', {
  width: '100%',
  fontFamily: '$bodyText',
  borderSpacing: '$4',
  tableLayout: 'fixed',
  marginTop: '$1',

  'thead th': {
    color: '$gray400',
    fontSize: '$sm',
  },

  'tbody td': {
    boxSizing: 'border-box',
    padding: '$3',
  },
})

export const CalendarDay = styled('button', {
  all: 'unset',
  position: 'relative',
  width: '100%',
  aspectRatio: '1 / 1',
  background: '$gray700',
  textAlign: 'center',
  cursor: 'pointer',
  borderRadius: '$full',
  transition: 'ease-in-out 250ms',
  color: '$text800',

  '&:disabled': {
    cursor: 'not-allowed',
    opacity: 0.5,
    background: '$gray700',
  },

  '&:not(:disabled):focus': {
    boxShadow: '$inFocus',
  },

  '&:not(:disabled):hover': {
    scale: 1.2,
  },

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

export const EventsInDayIndicator = styled('span', {
  position: 'absolute',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  top: '-$2',
  right: '-$1',
  width: '$4',
  height: '$4',
  lineHeight: 0,
  borderRadius: '$full',

  background: '$purple600',
})
