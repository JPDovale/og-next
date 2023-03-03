import { styled } from '@styles/index'

export const EditorContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',

  width: '100%',
  height: '100vh',
  padding: '$8',
  paddingBottom: '$40',

  background: '$gray800',
  borderRight: '0.5px solid $base900',

  '.buttons': {
    display: 'flex',
    gap: '$8',

    button: {
      padding: '$3',
      paddingRight: '$5',
    },

    '.cancel': {
      background: 'DarkRed',
    },
  },

  textarea: {
    minHeight: '380px',

    background: '$gray500',
    resize: 'none',
    cursor: 'pointer',

    '&:focus': {
      background: '$base500',
      color: '$gray900',

      boxShadow: '$onActive',
    },
  },

  variants: {
    toMany: {
      true: {
        overflowY: 'scroll',

        '@media screen and (max-width: 768px)': {
          overflowY: 'unset',
        },
      },
      false: {},
    },
  },

  '@media screen and (max-width: 768px)': {
    borderRight: 'none',
    borderBottom: '0.5px solid $base900',
    padding: '$4',
    paddingBottom: '$10',
    marginBottom: '$4',
    height: '100%',
  },
})

export const EditorHeader = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  span: {
    display: 'flex',
    gap: '$2',
  },

  '.goBack': {
    padding: '$2',

    svg: {
      width: 20,
      height: 20,
    },
  },
})
