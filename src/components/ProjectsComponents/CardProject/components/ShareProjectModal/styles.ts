import * as Dialog from '@radix-ui/react-dialog'

import { styled } from '@styles/index'

export const ModalOverlay = styled(Dialog.Overlay, {
  zIndex: 1,
  position: 'fixed',
  width: '100vw',
  height: '100vh',
  inset: 0,

  background: '#000000a0',
})

export const ModalContent = styled(Dialog.Content, {
  zIndex: 2,
  position: 'fixed',
  display: 'flex',
  flexDirection: 'column',

  padding: 0,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',

  borderRadius: '$md',
  background: '$gray500',
  border: '2px solid $purple400',

  '@media screen and (max-width: 768px)': {
    width: '90%',
  },
})

export const ModalClose = styled(Dialog.Close, {
  zIndex: 2,
  position: 'absolute',

  top: '$4',
  right: '$3',

  lineHeight: 0,

  border: 0,
  outline: 0,
  borderRadius: '$full',
  background: 'transparent',
  cursor: 'pointer',
  color: '$base100',

  '&:focus': {
    boxShadow: '$inFocus',
  },
  '&:active': {
    svg: {
      scale: '95%',
    },
  },
})

export const ModalTitle = styled(Dialog.Title, {
  position: 'relative',
  display: 'flex',

  padding: '$4',

  borderBottom: '0.5px solid $base900',
})

export const ShareForm = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  padding: '$8',
  gap: '$5',

  background: '$gray900',
  overflowY: 'scroll',
  height: '100%',

  button: {
    alignSelf: 'center',
  },
})
