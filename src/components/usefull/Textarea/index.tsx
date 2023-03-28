import { styled } from '@styles/index'
import { ComponentProps, forwardRef, TextareaHTMLAttributes } from 'react'

export const TextareaContainer = styled('textarea', {
  display: 'flex',
  alignItems: 'center',
  gap: '$3',

  padding: '$4',
  height: '10rem',

  fontFamily: '$bodyText',
  fontSize: '$md',
  textAlign: 'justify',

  background: '$gray700',
  borderRadius: '$sm',
  boxSizing: 'border-box',
  transition: 'all 500ms',
  border: 'none',
  outline: 'none',
  color: '$base100',
  resize: 'vertical',

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
  },

  defaultVariants: {
    variant: 'default',
  },
})

export interface ITextAreaProps
  extends ComponentProps<typeof TextareaContainer>,
    TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: 'default' | 'accepted' | 'denied' | 'attention' | 'noShadow'
}

export const Textarea = forwardRef<HTMLTextAreaElement, ITextAreaProps>(
  (props, ref) => {
    return <TextareaContainer {...props} ref={ref} />
  },
)

Textarea.displayName = 'Textarea'
