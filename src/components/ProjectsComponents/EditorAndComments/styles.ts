import { styled } from '@og-ui/react'

export const EditorContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  // justifyContent: 'space-between',

  background: '$gray800',
  // overflow: 'auto',

  '@media screen and (max-width: 768px)': {
    flexDirection: 'column',
    justifyContent: 'start',
  },
})

export const EditorHeader = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '$4',

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
