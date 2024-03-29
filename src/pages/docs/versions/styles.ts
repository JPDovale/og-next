import { styled } from '@styles/index'

export const VersionsPageContainer = styled('main', {
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

export const MultipleContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$10',
  width: '100%',
  maxHeight: '100vh',

  padding: '$8 16rem 20rem 16rem',
  overflowY: 'auto',

  '@media screen and (max-width: 768px)': {
    padding: '$8',
  },
})

export const ContentPage = styled('div', {
  marginTop: '$2',
  lineHeight: '$short',
  fontSize: '$xl',
  color: '$text800',
  fontFamily: '$bodyText',
  transition: 'ease-in-out 250ms',

  'p, ul': {
    margin: '$2 0',
    textAlign: 'justify',
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

  'ul, ol': {
    paddingLeft: '$8',

    li: {
      margin: '$2 0',
    },
  },
})
