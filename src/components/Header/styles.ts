import { styled } from '@og-ui/react'

export const HeaderContainer = styled('header', {
  position: 'fixed',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  zIndex: 1,

  top: 0,
  left: 0,
  right: 0,
  padding: '$1 $6',

  background: '$gray800',
  boxShadow: '0 2px 10px black',
})

export const ImageContent = styled('div', {
  img: {
    width: '100%',
    height: '100%',
    maxHeight: 70,
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
