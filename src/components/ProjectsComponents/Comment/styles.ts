import { styled } from '@styles/index'
export const CommentContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
})

export const HeaderComment = styled('div', {
  display: 'flex',
  gap: '$5',
  padding: '$4',

  span: {
    display: 'flex',
    gap: '$1',
    flexDirection: 'column',
    alignItems: 'flex-start',
    textAlign: 'start',

    p: {
      marginTop: 0,
    },
  },

  variants: {
    isPreview: {
      false: {
        padding: 0,
        paddingBottom: '$4',
        paddingTop: '$4',
        borderTop: '0.5px solid $gray700',
      },
      true: {},
    },
  },
})

export const CommentContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$2',
  paddingTop: '$4',

  background: '$gray800',

  span: {
    textAlign: 'start',
    padding: '0 $4',
    paddingBottom: '$5',
    color: '$base700',
  },
  variants: {
    isPreview: {
      false: {
        padding: '$4',

        background: '$base900',
        borderRadius: '$md',

        span: {
          padding: 0,
          color: '$base500',
          borderBottom: '0.5px solid $gray100',
        },

        '.content': {
          background: '$gray800',
          textAlign: 'justify',
          padding: '$2',
          borderRadius: '$xs',
          color: '$base300',
          lineHeight: '$short',
          boxShadow: '$default',
        },
      },
      true: {},
    },
  },
})

export const ResponsesComment = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',
})

export const NewResponseForm = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$2',

  textarea: {
    boxShadow: 'none',
    resize: 'none',
    height: 90,
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

export const Response = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  background: '$gray800',
  padding: '$4',
  borderRadius: '$xs',
  boxShadow: '$onActive',

  '.contentResponse': {
    textAlign: 'justify',
  },

  span: {
    display: 'flex',
    flexDirection: 'column',

    fontSize: 15,
  },
})
