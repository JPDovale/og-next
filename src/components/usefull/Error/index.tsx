import { styled } from '@styles/index'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Heading } from '../Heading'
import { Text } from '../Text'

interface IErrorProps {
  isRedirectable?: boolean
  pathRedirect?: string
  statusCode?: number
  errorMessage?: string
}

export function Error({
  errorMessage = 'Houve um erro durante a recuperação das infirmações. Entre em contato com a nossa equipe e informe o problema.',
  isRedirectable = false,
  pathRedirect = '/login',
  statusCode = 500,
}: IErrorProps) {
  const router = useRouter()

  useEffect(() => {
    if (!isRedirectable) return
    router.push(pathRedirect)
  }, [router, isRedirectable, pathRedirect])

  return (
    <ErrorContainer>
      <ErrorNumber size="2xl">{statusCode}</ErrorNumber>
      <ErrorMessage size="lg" family="body" weight="bold">
        {errorMessage}
      </ErrorMessage>
    </ErrorContainer>
  )
}

const ErrorContainer = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',

  width: '100%',
  height: '100vh',

  background: '$gray900',
})

const ErrorNumber = styled(Heading, {
  marginTop: '-$8',
})

const ErrorMessage = styled(Text, {
  width: '80%',
  marginTop: '$4',

  textAlign: 'center',
})
