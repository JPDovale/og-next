import { Box, Button, Text, styled } from '@og-ui/react'
import { X } from 'phosphor-react'

interface ISuccessProps {
  title: string
  message: string
  close: () => void
}

export function Success({ title, message, close }: ISuccessProps) {
  return (
    <SuccessContainer>
      <SuccessBox>
        <Text as="span" size="lg" weight="bold">
          {title}
        </Text>
        <Text as="p" size="lg" family="body">
          {message}
        </Text>
        <Button
          type="button"
          icon={<X />}
          label="Fechar"
          align="center"
          wid="hug"
          css={{
            padding: '$2 $20',
            marginTop: '$2',
          }}
          onClick={close}
        />
      </SuccessBox>
    </SuccessContainer>
  )
}

const SuccessContainer = styled('div', {
  zIndex: 10,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',

  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  width: '100%',
  height: '100%',

  background: '#050000a0',
})

const SuccessBox = styled(Box, {
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',
  alignItems: 'center',
  maxWidth: '40%',
  textAlign: 'center',

  '@media screen and (max-width: 768px)': {
    maxWidth: '90%',
  },

  span: {
    color: '$successDefault',
  },
})
