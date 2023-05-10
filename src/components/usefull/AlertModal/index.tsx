import { InterfaceContext } from '@contexts/interface'
import * as AlertDialog from '@radix-ui/react-alert-dialog'
import { styled } from '@styles/index'
import { useContext } from 'react'
import { Text } from '../Text'

interface IAlertModalProps {
  onAccept: () => void
  description: string
}

export function AlertModal({ description, onAccept }: IAlertModalProps) {
  const { theme } = useContext(InterfaceContext)

  return (
    <AlertDialog.Portal>
      <ModalOverlay />

      <ModalContentContainer darkMode={theme === 'dark'}>
        <AlertTitle>
          <Text size="lg" weight="bold" css={{ color: '$alertDefault' }}>
            Você tem certeza que quer fazer isso?
          </Text>
        </AlertTitle>

        <AlertDescription>
          <Text family="body" height="shorter" size="lg">
            {description}
          </Text>
        </AlertDescription>

        <Buttons>
          <AlertDialog.Cancel asChild>
            <Cancel css={{ color: theme === 'dark' ? '' : '$white' }}>
              Cancelar
            </Cancel>
          </AlertDialog.Cancel>

          <AlertDialog.Action asChild>
            <Accept onClick={onAccept}>Confirmar</Accept>
          </AlertDialog.Action>
        </Buttons>
      </ModalContentContainer>
    </AlertDialog.Portal>
  )
}

const ModalOverlay = styled(AlertDialog.Overlay, {
  zIndex: 3,
  position: 'fixed',
  width: '100vw',
  height: '100vh',
  inset: 0,

  background: '#00000070',
})

const ModalContentContainer = styled(AlertDialog.Content, {
  zIndex: 4,
  position: 'fixed',
  display: 'flex',
  flexDirection: 'column',

  padding: '$3',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  maxHeight: '90vh',
  overflowY: 'auto',

  borderRadius: '$md',
  background: '$gray900',
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
        background: '$base300',
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

const AlertTitle = styled(AlertDialog.Title, {
  padding: '$4',
})

const AlertDescription = styled(AlertDialog.Description, {
  padding: '$4',
})

const Buttons = styled('div', {
  display: 'flex',
  alignSelf: 'end',
  gap: '$4',
  padding: '$3',
})

const Cancel = styled('button', {
  all: 'unset',
  padding: '$3 $8',

  background: '$gray500',
  borderRadius: '$sm',
  cursor: 'pointer',
  transition: 'ease-in-out 250ms',
  border: '1px solid $gray500',

  textTransform: 'uppercase',
  fontFamily: '$bodyText',
  fontSize: '$xl',

  '&:hover': {
    scale: 1.05,
  },
})

const Accept = styled('button', {
  all: 'unset',
  padding: '$3 $8',

  border: '1px solid $fullError',
  background: '$errorDefault',
  borderRadius: '$sm',
  cursor: 'pointer',
  transition: 'ease-in-out 250ms',

  textTransform: 'uppercase',
  fontWeight: '$bold',
  fontFamily: '$bodyText',
  color: '$black',
  fontSize: '$xl',

  '&:hover': {
    scale: 1.05,
  },
})
