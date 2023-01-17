import { Text, styled } from '@og-ui/react'
import * as RadioGroup from '@radix-ui/react-radio-group'

export const RadioRoot = styled(RadioGroup.Root, {
  padding: '$2',
  borderRadius: '$xs',
})

export const RadioItem = styled(RadioGroup.Item, {
  width: 24,
  height: 24,

  borderRadius: '$full',
  background: '$gray400',
  cursor: 'pointer',
})

export const RadioSelected = styled(RadioGroup.Indicator, {
  borderRadius: '$full',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  position: 'relative',

  '&::after': {
    content: '',
    display: 'block',
    width: 12,
    height: 12,
    borderRadius: '$full',
    backgroundColor: '$gray600',
    boxShadow: '$default',
  },
})

export const RadioLabel = styled(Text, {
  display: 'flex',
  gap: 8,
  cursor: 'pointer',
})
