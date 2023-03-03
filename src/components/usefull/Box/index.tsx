import { styled } from '@styles/index'
import { ElementType, ComponentProps } from 'react'

export const BoxContainer = styled('div', {
  display: 'flex',

  padding: '$6',

  background: '$gray700',
  boxShadow: '$default',
  borderRadius: '$sm',
})

export interface IBoxProps extends ComponentProps<typeof BoxContainer> {
  as?: ElementType
}

export function Box(props: IBoxProps) {
  return <BoxContainer {...props} />
}

Box.displayName = 'Box'
