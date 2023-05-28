import { styled } from '@styles/index'

export const History = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  padding: '$4',

  '@media screen and (max-width: 768px)': {
    marginTop: '$4',
  },
})

export const HistoryContent = styled('div', {
  display: 'inline',
  padding: '$4',

  background: '$base300',
  boxShadow: '$onActive',
  borderRadius: '$xs',
  color: '$black',

  p: {
    display: 'block',
  },
})

export const ObjectContainer = styled('div', {
  padding: '$4',
})

export const ObjectivesContent = styled('div', {
  display: 'flex',

  flexDirection: 'column',
  gap: '$6',
})
