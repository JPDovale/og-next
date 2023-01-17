import { Heading, Text, styled } from '@og-ui/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export function Error() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/login')
  }, [router])

  return (
    <ErrorContainer>
      <ErrorNumber size="lg">500</ErrorNumber>
      <ErrorMessage size="xxs">
        Houve um erro durante a recuperação das infirmações. Entre em contato
        com a nossa equipe e informe o problema.
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

const ErrorNumber = styled(Heading, {})

const ErrorMessage = styled(Text, {
  width: '80%',
  marginTop: '$4',

  textAlign: 'center',
})
