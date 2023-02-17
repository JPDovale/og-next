import { Heading, Text, styled } from '@og-ui/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

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
      <ErrorNumber size="lg">{statusCode}</ErrorNumber>
      <ErrorMessage size="xxs">{errorMessage}</ErrorMessage>
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

const ErrorNumber = styled(Heading, {})

const ErrorMessage = styled(Text, {
  width: '80%',
  marginTop: '$4',

  textAlign: 'center',
})
