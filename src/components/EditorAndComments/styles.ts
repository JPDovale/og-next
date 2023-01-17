import { styled } from '@og-ui/react'

export const EditorContainer = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',

  background: '$gray900',
  overflow: 'hidden',

  '@media screen and (max-width: 768px)': {
    flexDirection: 'column',
    justifyContent: 'start',
  },
})
