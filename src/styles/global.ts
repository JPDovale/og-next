import { globalCss } from '.'

export const globalStyles = globalCss({
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',

    scrollbarWidth: 'thin',
    scrollbarColor: '#00000000 #00000000',

    '&::-webkit-scrollbar': {
      width: 3,
      height: 3,
    },

    '&::-webkit-scrollbar-track': {
      background: '#00000000',
    },

    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '$purple800',
      border: '1px solid #ffffff20',
      borderRadius: '$full',
    },
  },

  a: {
    all: 'unset',
  },

  body: {
    overflowX: 'hidden',
    '-webkit-font-smoothing': 'antialiased',
    color: '$text800',
  },
})
