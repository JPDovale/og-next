import { styled } from '@styles/index'
import { ComponentProps, forwardRef, TextareaHTMLAttributes } from 'react'

export const TextareaContainer = styled('textarea', {
  display: 'flex',
  alignItems: 'center',
  gap: '$3',

  padding: '$4',
  width: '100%',
  height: '10rem',

  fontFamily: '$bodyText',
  fontSize: '$md',
  textAlign: 'justify',

  background: '$gray700',
  borderRadius: '$sm',
  boxSizing: 'border-box',
  transition: 'ease-in-out 250ms',
  border: 'none',
  outline: 'none',
  color: '$text800',

  '&:focus': {
    boxShadow: '$inFocus',
  },

  '&:disabled': {
    opacity: '0.5',
    resize: 'none',
    cursor: 'not-allowed',
  },

  variants: {
    variant: {
      default: {
        boxShadow: '$default',
      },
      accepted: {
        boxShadow: '$accepted',
      },
      denied: {
        boxShadow: '$denied',
      },
      attention: {
        boxShadow: '$attention',
      },
      noShadow: {
        boxShadow: 'unset',
      },
    },
    resizable: {
      true: {
        resize: 'vertical',
      },
      false: {
        resize: 'none',
      },
    },
  },

  defaultVariants: {
    variant: 'default',
    resizable: 'false',
  },
})

export interface ITextAreaProps
  extends ComponentProps<typeof TextareaContainer>,
    TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: 'default' | 'accepted' | 'denied' | 'attention' | 'noShadow'
  resizable?: boolean
}

export const Textarea = forwardRef<HTMLTextAreaElement, ITextAreaProps>(
  ({ resizable = false, ...props }, ref) => {
    return <TextareaContainer {...props} resizable={resizable} ref={ref} />
  },
)

Textarea.displayName = 'Textarea'
