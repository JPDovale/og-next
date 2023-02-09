import { styled, Text } from '@og-ui/react'
import { ReactNode } from 'react'

interface IInfoDefaultProps {
  children?: ReactNode
  title: string
}

export function InfoDefault({ children, title }: IInfoDefaultProps) {
  return (
    <InfoContainer>
      <Text as="span" size="sm" family="body" height="shorter">
        {title}
      </Text>

      <Text as="div" size="sm">
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
    color: '$base900',
  },
})
