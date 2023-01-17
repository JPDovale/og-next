import { styled } from '@og-ui/react'

export const CommentsOnPageContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$6',

  width: '100%',
  padding: '$8',
  paddingBottom: '$40',

  background: '$gray900',
  boxShadow: '$onActive',
  overflowY: 'scroll',
  overflowX: 'hidden',
  transition: 'ease-in-out 250ms',

  '@media screen and (max-width: 768px)': {
    padding: '$4',
    overflow: 'unset',
  },

  variants: {
    onWindow: {
      false: {
        marginRight: '-100%',
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

  button: {
    padding: '$3',
    boxShadow: 'none',
  },
})

export const Comments = styled('div', {})

export const ShowComment = styled('button', {
  position: 'absolute',
  padding: '$2',
  paddingRight: '$12',
  right: '-$3',
  top: '$40',

  lineHeight: 0,

  color: '$base900',
  border: 'none',
  outline: 'none',
  background: 'none',
  cursor: 'pointer',
  transition: 'ease-in-out 250ms',

  '@media screen and (max-width: 768px)': {
    display: 'none',
  },

  variants: {
    show: {
      true: {},
      false: {
        rotate: '180deg',
        right: '-$3',

        paddingRight: '$2',
        paddingLeft: '$4',

        background: '$gray900',
        borderRadius: '$sm',
        opacity: 0.4,

        '&:hover': {
          opacity: 1,
        },
      },
    },
  },

  defaultVariants: {
    show: false,
  },
})
