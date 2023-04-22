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
  size?: 'md' | 'lg' | 'sm'
  as?: 'div' | 'span' | 'label'
}

export function InfoDefault({
  children,
  title,
  size = 'md',
  as = 'div',
  ...props
}: IInfoDefaultProps) {
  return (
    <InfoContainer {...props}>
      <Text as="span" size={size} family="body" height="shorter">
        {title}
      </Text>

      <Text as={as} size={size} weight="bold">
        {children}
      </Text>
    </InfoContainer>
  )
}
