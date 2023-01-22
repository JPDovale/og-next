import { Text, styled } from '@og-ui/react'
import { IError } from '../../@types/errors/IError'
import { ISuccess } from '../../@types/success/ISuccess'

interface IResponseInfoApiProps {
  error?: IError
  success?: ISuccess
}

export function ResponseInfoApi({ error, success }: IResponseInfoApiProps) {
  return (
    <ResponseInfoApiContainer isError={!!error?.title}>
      <Text size="sm" as="span">
        {error?.title || success?.successTitle}
      </Text>
      <Text size="sm" family="body">
        {error?.message || success?.successMessage}
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

  variants: {
    isError: {
      true: {
        span: {
          color: '$errorDefault',
        },
      },
      false: {
        span: {
          color: '$successDefault',
        },
      },
    },
  },
})
