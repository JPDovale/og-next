import { styled } from '@styles/index'

export const CommentsOnPageContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$6',

  width: '100%',
  padding: '$4',
  paddingBottom: '$20',

  transition: 'ease-in-out 250ms',

  '@media screen and (max-width: 768px)': {
    padding: '$4',
    overflow: 'unset',
  },

  variants: {
    size: {
      md: {},
      xxs: {
        padding: 0,
        gap: '$2',
      },
    },
  },
})

export const CommentsHeader = styled('div', {
  display: 'flex',

  p: {
    display: 'flex',
    gap: '$4',
  },
})

export const NewCommentForm = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',

  textarea: {
    boxShadow: 'none',
    resize: 'none',
    height: 110,
    padding: '$2',

    '&:focus': {
      boxShadow: 'none',
    },
  },
})

export const Comments = styled('div', {})
