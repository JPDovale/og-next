import { styled } from '@styles/index'

export const HeaderContainer = styled('header', {
  position: 'fixed',
  display: 'flex',
  justifyContent: 'end',
  alignItems: 'center',
  zIndex: 1,

  width: '100%',
  top: 0,
  left: 0,
  right: 0,
  padding: '$4',

  backgroundColor: '$gray700',
  boxShadow: '0 2px 8px black',
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
  gap: '$3',

  button: {
    boxShadow: 'none',
    padding: '$3',
  },
})
