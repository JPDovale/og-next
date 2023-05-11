import { styled } from '@styles/index'

export const EditorHeader = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
  padding: '$4',
  gap: '$4',

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
