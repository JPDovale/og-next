import { styled } from '@og-ui/react'

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
