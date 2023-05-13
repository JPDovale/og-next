import { Header } from '@components/Header'
import { AvatarWeb } from '@components/usefull/Avatar'
import { Error } from '@components/usefull/Error'
import { Heading } from '@components/usefull/Heading'
import { Text } from '@components/usefull/Text'
import { useUser } from '@hooks/useUser'
import { NextSeo } from 'next-seo'
import { useEffect } from 'react'
import { CongratsContainer, ProSuccessPageContainer } from './styles'

export default function ProSuccessPage() {
  const { refetchUser, user, userIsPro } = useUser()

  useEffect(() => {
    refetchUser()
  }, [refetchUser])

  if (!userIsPro || !user) {
    return <Error statusCode={404} errorMessage="Not found" />
  }

  return (
    <>
      <NextSeo title="Bem-vindo ao premium" noindex />

      <ProSuccessPageContainer>
        <Header />

        <CongratsContainer>
          <Heading css={{ marginBottom: '$8' }}>
            PARABÉNS! AGORA VOCÊ É MAGISCRITA PRO
          </Heading>

          <AvatarWeb src={user.avatar_url ?? undefined} size="5xl" />

          <Text
            css={{ textAlign: 'justify' }}
            size="lg"
            family="body"
            height="shorter"
          >
            Fala {user.username}, <br /> <br />
            Gostaríamos de expressar nosso mais sincero agradecimento por você
            ter escolhido assinar um plano em nossa plataforma de escrita
            criativa, MagiScrita. Sua confiança em nosso serviço é extremamente
            valiosa para nós.
            <br />
            <br /> Estamos muito animados em ter você a bordo e mal podemos
            esperar para acompanhar sua jornada literária. Acreditamos que a
            escrita é uma forma poderosa de expressão e criatividade, e estamos
            aqui para apoiá-lo em cada passo do caminho.
            <br />
            <br /> Nossa plataforma foi projetada para fornecer uma experiência
            envolvente e inspiradora, com ferramentas e recursos para ajudá-lo a
            aprimorar suas habilidades de escrita e desbloquear todo o seu
            potencial. Esperamos que você encontre um ambiente acolhedor e
            estimulante para cultivar suas ideias e compartilhar suas histórias
            únicas.
            <br />
            <br /> Saiba que estamos sempre abertos a feedbacks e sugestões para
            melhorar ainda mais nossa plataforma. Se houver algo em que possamos
            ajudar ou se tiver alguma dúvida, não hesite em entrar em contato
            conosco. Estamos aqui para você.
            <br />
            <br />
            Mais uma vez, obrigado por se juntar à família MagiScrita. Desejamos
            a você muito sucesso em suas aventuras literárias e esperamos que
            você encontre toda a inspiração e apoio que precisa em nossa
            plataforma.
            <br />
            {user.subscription?.mode === 'payment' && (
              <>
                Notamos também que você executou a compra unica de nossa
                plataforma!
                <br />
                <br />
                Seu compromisso em se tornar parte dessa comunidade é valorizado
                e, por isso, gostaríamos de agradecer mais uma vez pela sua
                confiança em nós. Acreditamos que a troca de conhecimentos e
                experiências dentro no mundo da escrita criativa proporcionará
                um crescimento mútuo, além de abrir portas para novas
                oportunidades.
                <br />
                <br />
                Esteja atento(a) ao seu e-mail, pois em breve você receberá um
                contato de um membro da nossa equipe. Eles estarão prontos para
                lhe fornecer todos os detalhes necessários para que você possa
                aproveitar plenamente a sua assinatura e desfrutar de todas as
                vantagens que a nossa comunidade tem a oferecer.
              </>
            )}
            <br />
            <br /> Com gratidão, <br /> A equipe da<strong> MagiScrita</strong>
          </Text>
        </CongratsContainer>
      </ProSuccessPageContainer>
    </>
  )
}
