import { globalCss } from '.'

export const globalStyles = globalCss({
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',

    scrollbarWidth: 'thin',
    scrollbarColor: '#00000000 #00000000',

    '&::-webkit-scrollbar': {
      width: 8,
      height: 8,
    },

    '&::-webkit-scrollbar-track': {
      background: '#00000000',
    },

    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#121416',
      border: '1px solid #ffffff20',
    },
  },

  body: {
    overflowX: 'hidden',
    '-webkit-font-smoothing': 'antialiased',
  },
})
