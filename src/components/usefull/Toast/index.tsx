import { ToastDescription, ToastTitle } from '@radix-ui/react-toast'
import { X } from 'phosphor-react'
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
  return (
    <ToastRoot open={open} onOpenChange={setOpen}>
      <ToastTitle>
        <Text
          weight="bold"
          css={{
            color: type === 'error' ? '$errorDefault' : '$successDefault',
          }}
        >
          {title}
        </Text>
      </ToastTitle>

      <ToastDescription>
        <Text family="body">{message}</Text>
      </ToastDescription>

      <ToastClose>
        <X />
      </ToastClose>
    </ToastRoot>
  )
}
