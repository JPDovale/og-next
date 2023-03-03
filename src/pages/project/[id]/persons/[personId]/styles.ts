import { styled } from '@styles/index'
export const HeaderPersonInfos = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  position: 'relative',

  borderBottom: '1px solid $gray400',
  minHeight: '420px',
  height: '420px',
  maxHeight: '420px',

  '.image': {
    display: 'flex',
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '40%',
    minHeight: '320px',
    maxHeight: '420px',

    background: '$gray800',
    overflow: 'hidden',
    objectFit: 'cover',
    cursor: 'pointer',
  },

  '@media screen and (max-width: 768px)': {
    flexDirection: 'column',
    maxHeight: 'unset',

    '.image': {
      width: '100%',
      minHeight: '280px',
    },
  },
})

export const History = styled('div', {
  padding: '$4',

  '@media screen and (max-width: 768px)': {
    marginTop: '$40',
  },
})

export const HistoryContent = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',
  padding: '$4',

  background: '$base300',
  boxShadow: '$onActive',
  borderRadius: '$xs',

  p: {
    textAlign: 'justify',
    fontFamily: '$bodyText',
    fontWeight: 'bold',
    lineHeight: '$base',
    fontSize: '1.1rem',

    color: '$gray900',
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
