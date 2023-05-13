import { styled } from '@styles/index'

export const HeaderContainer = styled('header', {
  position: 'fixed',
  display: 'grid',
  gridTemplateColumns: '3fr 30fr 3fr',
  alignItems: 'center',
  zIndex: 1,

  height: 64,
  width: '100%',
  top: 0,
  left: 0,
  right: 0,
  padding: '0 $4',

  backgroundColor: '$gray700',
  boxShadow: '0 2px 8px black',
})

export const ExplorerHeader = styled('div', {
  display: 'flex',
  height: '100%',
  gap: '$2',
  alignItems: 'center',
  flexWrap: 'nowrap',
})

export const ImageContent = styled('div', {
  position: 'absolute',
  left: 0,

  img: {
    width: '100%',
    height: '100%',
    maxHeight: '70px',
  },
})

export const ButtonsContent = styled('div', {
  display: 'flex',
  justifyContent: 'end',
  gap: '$3',
})

export const Space = styled('div', {
  minHeight: 64,
  minWidth: '100%',
})
