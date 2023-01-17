import { Text, styled } from '@og-ui/react'
import { IError } from '../../@types/errors/IError'

interface IResponseInfoApiProps {
  error: IError
}

export function ResponseInfoApi({ error }: IResponseInfoApiProps) {
  return (
    <ResponseInfoApiContainer>
      <Text size="sm" as="span">
        {error.title}
      </Text>
      <Text size="sm" family="body">
        {error.message}
      </Text>
    </ResponseInfoApiContainer>
  )
}

const ResponseInfoApiContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',

  span: {
    color: '$errorDefault',
  },
})
