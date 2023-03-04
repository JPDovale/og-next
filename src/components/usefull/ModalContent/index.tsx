import { styled } from '@styles/index'
import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'phosphor-react'
import { Text } from '../Text'
import { ReactNode } from 'react'

interface IModalContentProps {
  title?: string
  children?: ReactNode
  sizeWid?: 'sm' | 'md' | 'lg'
}

export function ModalContent({
  children,
  title,
  sizeWid = 'md',
}: IModalContentProps) {
  return (
    <Dialog.Portal>
      <ModalOverlay />

      <ModalContentContainer sizeWid={sizeWid}>
        <ModalClose>
          <X size={20} />
        </ModalClose>

        {title && (
          <ModalTitle asChild>
            <Text as={'h3'}>{title}</Text>
          </ModalTitle>
        )}

        {children}
      </ModalContentContainer>
    </Dialog.Portal>
  )
}

const ModalOverlay = styled(Dialog.Overlay, {
  zIndex: 3,
  position: 'fixed',
  width: '100vw',
  height: '100vh',
  inset: 0,

  background: '#000000a0',
})

const ModalContentContainer = styled(Dialog.Content, {
  zIndex: 4,
  position: 'fixed',
  display: 'flex',
  flexDirection: 'column',

  padding: 0,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  maxHeight: '90vh',
  overflowY: 'auto',

  borderRadius: '$md',
  background: '$gray500',
  border: '2px solid $purple400',

  variants: {
    sizeWid: {
      sm: {
        width: '30%',
        '@media screen and (max-width: 768px)': {
          width: '90%',
        },
      },
      md: {},
      lg: {
        width: '70%',
        '@media screen and (max-width: 768px)': {
          width: '90%',
        },
      },
    },
  },

  '@media screen and (max-width: 768px)': {
    width: '90%',
  },
})

export const ModalClose = styled(Dialog.Close, {
  zIndex: 5,
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
