import { styled } from '@styles/index'
import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'phosphor-react'
import { Text } from '../Text'
import { ReactNode, useContext } from 'react'
import { InterfaceContext } from '@contexts/interface'

interface IModalContentProps {
  title?: string
  children?: ReactNode
  sizeWid?: 'sm' | 'md' | 'lg'
  hideCloseButton?: boolean
}

export function ModalContent({
  children,
  title,
  sizeWid = 'md',
  hideCloseButton = false,
}: IModalContentProps) {
  const { theme } = useContext(InterfaceContext)

  const isDarkMode = theme === 'dark'

  return (
    <Dialog.Portal>
      <ModalOverlay />

      <ModalContentContainer darkMode={isDarkMode} sizeWid={sizeWid}>
        {!hideCloseButton && (
          <ModalClose>
            <X size={20} />
          </ModalClose>
        )}

        {title && (
          <ModalTitle asChild>
            <Text
              size="lg"
              weight="bold"
              css={{ color: isDarkMode ? '$white' : '' }}
            >
              {title}
            </Text>
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

  background: '#000000bf',
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
    darkMode: {
      true: {},
      false: {
        background: '$base700',
      },
    },
  },

  defaultVariants: {
    darkMode: false,
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
