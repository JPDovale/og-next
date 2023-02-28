import { styled, Text } from '@og-ui/react'
import { ReactNode } from 'react'

interface IInfoDefaultProps {
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
}: IInfoDefaultProps) {
  return (
    <InfoContainer>
      <Text as="span" size={size} family="body" height="shorter">
        {title}
      </Text>

      <Text as={as} size={size}>
        {children}
      </Text>
    </InfoContainer>
  )
}

const InfoContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',

  span: {
    color: '$base800',
  },
})
