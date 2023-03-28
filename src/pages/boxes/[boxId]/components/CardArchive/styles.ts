import { styled } from '@styles/index'

export const CardArchiveContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  background: '$gray900',
  borderRadius: '$sm',
})

export const HeaderCardArchive = styled('div', {
  padding: '$4',

  borderBottom: '1px solid $purple400',
})

export const ContentCardArchive = styled('div', {
  padding: '$2 $4',
})

export const ImageContainer = styled('div', {
  position: 'relative',

  minHeight: '320px',
  maxHeight: '380px',
  overflow: 'hidden',
  borderRadius: '$sm',
  border: '2px solid $purple400',

  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
})

export const DeleteButton = styled('button', {
  all: 'unset',

  position: 'absolute',

  padding: '$1',
  right: 0,

  lineHeight: 0,

  background: '$fullError',
  borderRadius: '$xs',
  cursor: 'pointer',

  '&:hover': {
    scale: 1.05,
  },

  svg: {
    width: '$4',
    height: '$4',
  },
})
