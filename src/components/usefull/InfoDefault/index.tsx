import { styled } from '@styles/index'
import { ComponentProps, ReactNode } from 'react'
import { Text } from '../Text'

const InfoContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',

  span: {
    color: '$base800',
  },
})

interface IInfoDefaultProps extends ComponentProps<typeof InfoContainer> {
  children?: ReactNode
  title: string
  size?: 'md' | 'lg' | 'sm' | 'xs'
  as?: 'div' | 'span' | 'label'
  disableBold?: boolean
}

export function InfoDefault({
  children,
  title,
  size = 'md',
  as = 'div',
  disableBold = false,
  ...props
}: IInfoDefaultProps) {
  return (
    <InfoContainer {...props}>
      <Text
        as="span"
        size={size}
        family="body"
        height="shorter"
        weight={disableBold ? 'medium' : 'bold'}
      >
        {title}
      </Text>

      <Text as={as} size={size} weight={disableBold ? 'medium' : 'bold'}>
        {children}
      </Text>
    </InfoContainer>
  )
}
