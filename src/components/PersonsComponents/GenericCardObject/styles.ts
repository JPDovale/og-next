import { styled } from '@styles/index'
export const GenericCardObjectContainer = styled('div', {
  position: 'relative',
  borderRadius: '$sm',
  boxShadow: '$onActive',
  background: '$gray900',
})

export const ObjectInfos = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',

  padding: '$4',
})

export const ItemInfo = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  width: '100%',

  label: {
    color: '$base800',
  },
})

export const EditButton = styled('button', {
  position: 'absolute',

  top: '0',
  right: '0',
  padding: '$2',

  background: 'none',
  border: 'none',
  outline: 'none',
  cursor: 'pointer',
  transition: 'ease-in-out 250ms',

  '&:hover': {
    rotate: '360deg',
  },
})

export const SubObjects = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  width: '100%',
  gap: '$4',

  '@media screen and (max-width: 768px)': {
    gridTemplateColumns: '1fr',
  },
})

export const SubObjectCard = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',

  padding: '$4',

  background: '$gray600',
  borderRadius: '$sm',
})

export const Relational = styled('div', {
  display: 'grid',
  gridTemplateColumns: '1fr 4fr',
  alignItems: 'center',
  gap: '$4',
  marginTop: '$3',
})

export const RelationalInfos = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  label: {
    color: '$base800',
  },
})
