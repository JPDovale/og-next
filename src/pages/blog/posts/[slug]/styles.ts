import { styled } from '@styles/index'

export const PostPageContainer = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  background: '$gray900',
})

export const PostBody = styled('article', {
  width: '100%',
  margin: '0 auto',
  maxWidth: '48rem',
  padding: '$4',
  paddingBottom: '$40',
  color: '$text800',
})

export const PostTitle = styled('h1', {
  fontSize: '$7xl',
  fontFamily: '$bodyText',
})

export const PostDate = styled('time', {
  display: 'block',
  fontSize: '$lg',
  lineHeight: '0.5',
  fontFamily: '$bodyText',
  opacity: 0.6,
})

export const PostContent = styled('div', {
  marginTop: '$2',
  lineHeight: '$short',
  fontSize: '$xl',
  color: '$text800',
  fontFamily: '$bodyText',
  transition: 'ease-in-out 250ms',

  'p, ul': {
    margin: '$4 0',
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

  p: {
    textAlign: 'justify',
  },

  'ul, ol': {
    paddingLeft: '$8',

    li: {
      margin: '$2 0',
    },
  },
})

export const PostImage = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  padding: '$8',

  img: {
    width: '100%',
    height: 'auto',
    borderRadius: '$lg',
    boxShadow: '$default',
  },
})
