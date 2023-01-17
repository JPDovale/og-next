import { globalCss } from '@og-ui/react'

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
      backgroundColor: '#eeeeee30',
      borderRadius: 10,
      border: '1px solid #321a30',
    },
  },

  body: {
    overflowX: 'hidden',
    background: '$gray900',
    color: '$base100',
    '-webkit-font-smoothing': 'antialiased',
  },
})
