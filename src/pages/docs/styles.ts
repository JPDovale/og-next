import { styled } from '@styles/index'

export const DocsPageContainer = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  maxHeight: '100vh',
  background: '$gray900',
  overflow: 'hidden',
})

export const Documentation = styled('div', {
  display: 'flex',
})

export const ContentPage = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxHeight: '100vh',

  padding: '$8 16rem 20rem 16rem',

  marginTop: '$2',
  lineHeight: '$short',
  fontSize: '$xl',
  color: '$text800',
  overflowY: 'auto',
  fontFamily: '$bodyText',
  transition: 'ease-in-out 250ms',

  'p, ul': {
    margin: '$2 0',
    textAlign: 'justify',
  },

  img: {
    maxWidth: '100%',
    maxHeight: '420px',
    borderRadius: '$sm',
  },

  a: {
    color: '$purple400',
    cursor: 'pointer',

    '&:hover': {
      textDecoration: 'underline',
    },
  },

  h2: {
    fontSize: '$5xl',
    margin: '$8 0',
  },

  h5: {
    fontSize: '$2xl',
    margin: '$2 0',
  },

  'ul, ol': {
    paddingLeft: '$8',

    li: {
      margin: '$2 0',
    },
  },
})
