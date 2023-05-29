import { styled } from '@styles/index'

export const PostsPageContainer = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  background: '$gray900',
})

export const Group = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  margin: '0 auto',
  width: '100%',
  maxWidth: '72rem',
  padding: '$4',
  paddingBottom: '$40',
  marginTop: '$8',
  gap: '$4',
  color: '$text800',
})

export const PostsContainer = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  flexWrap: 'wrap',
  justifyContent: 'start',
  gap: '$4',

  variants: {
    isEmpty: {
      true: {
        gridTemplateColumns: '1fr',
      },
    },
  },

  '@media screen and (max-width: 768px)': {
    gridTemplateColumns: '1fr',
  },
})

export const PostPreview = styled('a', {
  background: '$gray800',
  borderRadius: '$sm',
  boxShadow: '$default',
  transition: 'ease-in-out 250ms',
  cursor: 'pointer',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'start',

  '&:hover': {
    scale: 1.02,
  },

  '&:focus': {
    boxShadow: '$inFocus',
  },
})

export const PostPreviewImage = styled('div', {
  width: '100%',

  img: {
    width: '100%',
    borderRadius: '$sm $sm 0 0',
  },
})

export const PostPreviewContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  padding: '$4',
})

export const PostPreviewTime = styled('time', {
  fontSize: '$sm',
  fontFamily: '$bodyText',
  height: '$5',
  color: '$test800',
  opacity: '0.8',
})

export const PostPreviewTitle = styled('strong', {
  fontSize: '$2xl',
  fontFamily: '$bodyText',
  lineHeight: '1',
  color: '$test800',
})

export const PostPreviewDescription = styled('p', {
  fontSize: '$sm',
  textAlign: 'justify',

  marginTop: '$2',
  fontFamily: '$bodyText',
  color: '$test800',
})
