import { InterfaceContext } from '@contexts/interface'
import { ToastDescription, ToastTitle } from '@radix-ui/react-toast'
import { X } from 'phosphor-react'
import { useContext } from 'react'
import { Text } from '../Text'
import { ToastClose, ToastRoot } from './styles'

interface IToastProps {
  open: boolean
  setOpen: (newState: boolean) => void
  title: string
  message: string
  type?: 'success' | 'error'
}

export function Toast({
  open,
  setOpen,
  title,
  message,
  type = 'success',
}: IToastProps) {
  const { theme } = useContext(InterfaceContext)

  return (
    <ToastRoot open={open} darkMode={theme === 'dark'} onOpenChange={setOpen}>
      <ToastTitle>
        <Text
          weight="bold"
          family="body"
          size="xl"
          css={{
            color:
              type === 'error'
                ? theme === 'dark'
                  ? '$errorDefault'
                  : '$fullError'
                : 'DarkGreen',
          }}
        >
          {title}
        </Text>
      </ToastTitle>

      <ToastDescription>
        <Text family="body" size="sm" height="shorter">
          {message}
        </Text>
      </ToastDescription>

      <ToastClose>
        <X />
      </ToastClose>
    </ToastRoot>
  )
}
