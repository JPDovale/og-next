import * as Select from '@radix-ui/react-select'
import { styled } from '@styles/index'

export const NewPersonForm = styled('form', {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: '$8',

  padding: '$4',
  height: 'auto',
  maxHeight: '980px',

  borderRadius: '0 0 $sm $sm',
  transition: 'ease-in-out 250ms',

  variants: {
    darkMode: {
      true: {
        background: '$gray900',
        color: '$white',
      },
      false: {
        background: '$base400',
      },
    },
  },

  defaultVariants: {
    darkMode: false,
  },

  '@media screen and (max-width: 768px)': {
    maxHeight: '2090px',
    height: 'auto',
  },
})

export const SelectRoot = styled(Select.Root, {})

export const SelectTrigger = styled(Select.Trigger, {
  all: 'unset',
  boxShadow: '$default',
  background: '$gray600',
  borderRadius: '$sm',
  padding: '$3',

  display: 'inline-flex',
  alignItems: 'center',
  gap: '$3',
  fontFamily: '$text',
  color: '$base600',
  cursor: 'pointer',
  transition: 'ease-in-out 250ms',

  variants: {
    darkMode: {
      true: {
        background: '$gray600',
      },
      false: {
        background: '$base700',
        color: '$text800',
      },
    },
  },

  defaultVariants: {
    darkMode: false,
  },
})

export const SelectValue = styled(Select.Value, {
  cursor: 'pointer',
})

export const SelectIcon = styled(Select.Icon, {
  lineHeight: 0,
})

export const SelectPortal = styled(Select.Portal, {})

export const SelectContent = styled(Select.Content, {
  zIndex: 100,
  position: 'absolute',
  borderRadius: '$sm',
  boxShadow:
    '0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)',

  variants: {
    darkMode: {
      true: {
        background: '$gray300',
      },
      false: {
        background: '$base600',
        color: '$text800',
      },
    },
  },

  defaultVariants: {
    darkMode: false,
  },
})

export const SelectScrollUpButton = styled(Select.ScrollUpButton, {
  color: '$purple500',
  alignSelf: 'center',
})

export const SelectViewport = styled(Select.Viewport, {
  padding: '$4',
  display: 'flex',
  flexDirection: 'column',
  gap: '$2',
})

export const SelectItem = styled(Select.Item, {
  fontFamily: '$text',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '$2',
  borderRadius: '$sm',
  background: '$base700',
  cursor: 'pointer',
  transition: 'ease-in-out 250ms',

  '&:hover': {
    scale: 1.01,
    boxShadow: '$default',
  },
})

export const SelectItemText = styled(Select.ItemText, {})

export const SelectItemIndicator = styled(Select.ItemIndicator, {
  lineHeight: 0,
  fontWeight: 'bold',
})
