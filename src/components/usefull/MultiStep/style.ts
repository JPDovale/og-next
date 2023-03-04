import { styled } from '@styles/index'
import { Text } from '../Text'

export const MultiStepContainer = styled('div', {})

export const Label = styled(Text, {
  color: '$gray200',
  fontWeight: 'bolder',
})

export const Steps = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(var(--steps-size), 1fr)',
  gap: '$2',
  marginTop: '$1',
})

export const Step = styled('div', {
  height: '3px',
  borderRadius: '$xxs',
  background: '$blue700',

  variants: {
    active: {
      true: {
        background: '$blue300',
      },
    },
  },
})
