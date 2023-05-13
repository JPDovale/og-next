import { IError } from '@@types/errors/IError'
import { getPricesRequest } from '@api/productsRequest/'
import { Header } from '@components/Header'
import { PricingCard } from '@components/ProductsComponents/PricingCard'
import { Heading } from '@components/usefull/Heading'
import { Text } from '@components/usefull/Text'
import { ToastError } from '@components/usefull/ToastError'
import { useUser } from '@hooks/useUser'
import { getStripeJs } from '@services/stripejs'
import { GetStaticProps } from 'next'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { useState } from 'react'
import {
  DiscountCard,
  PricingPageBodyContainer,
  PricingPTBRPageContainer,
  PricingTable,
} from './style'

interface IPricingPTBRPage {
  prices: {
    id: string
    type: string
    amount: string
  }[]
}

export default function PricingPTBRPage({ prices }: IPricingPTBRPage) {
  const [error, setError] = useState<IError | null>(null)
  const router = useRouter()

  const { user, callEvent, userIsPro } = useUser()

  async function handleSubscribe(priceId: string) {
    if (!user) {
      router.push('/login')
      return
    }

    const stripe = await getStripeJs()

    const { result, error } = await callEvent.createCheckoutSession(priceId)

    if (!result || error) {
      return setError(error ?? null)
    }

    await stripe?.redirectToCheckout({
      sessionId: result.checkoutSessionId,
    })
  }

  router.push('/projects')

  return (
    <>
      <NextSeo title="Preços dos planos do MagiScrita" />

      <PricingPTBRPageContainer>
        <Header />

        <ToastError error={error} setError={setError} />

        <PricingPageBodyContainer>
          <DiscountCard>
            <Text family="body" size="lg" weight="bold">
              {userIsPro
                ? 'Você já é assinante'
                : 'Economize 8% no plano semestral ou até 16% no plano anual'}
            </Text>
          </DiscountCard>

          <Heading
            size="xl"
            css={{ textAlign: 'center', margin: '$8 0' }}
            as="h1"
          >
            PLANOS E PREÇOS
          </Heading>

          <PricingTable>
            <PricingCard
              buttonIsDisabled={userIsPro}
              priceId="0"
              features={[
                {
                  text: '1 projeto',
                  limited: true,
                },
                {
                  text: '1 compartilhamento máximo de projeto',
                  limited: true,
                },
                {
                  text: 'Acesso a apensa 3 projetos de outros usuários na opção de compartilhamento',
                  limited: true,
                },
                {
                  text: '10 personagens por projeto',
                  limited: true,
                },
                {
                  text: 'Limitação durante a criação de elementos nos personagens',
                  limited: true,
                },
                {
                  text: '1 livro por projeto',
                  limited: true,
                },
                {
                  text: '10 capítulos por livro',
                  limited: true,
                },
                {
                  text: '6 cenas por capítulo',
                  limited: true,
                },
                {
                  text: '1 caixa de ideas',
                  limited: true,
                },
                {
                  text: '3 arquivos por caixa de ideia',
                  limited: true,
                },
                {
                  text: '3 imagens por arquivo',
                  limited: true,
                },
              ]}
              onSelectPlan={(id) => router.push('/register')}
              revalidateInTime="Resto da vida"
              title="Gratis"
              amount="R$ 0.00"
              description="Ideal para você que começou a escrever agora e precisa de um lugar para guardar as suas ideias incríveis."
            />

            <PricingCard
              buttonIsDisabled={userIsPro}
              priceId={prices[0].id}
              features={[
                {
                  text: 'Projeto ilimitados',
                },
                {
                  text: '5 compartilhamento com outros usuários por projeto',
                },
                {
                  text: 'Acesso a 10 projetos de outros usuários na opção de compartilhamento',
                },
                {
                  text: 'Personagens ilimitados por projeto',
                },
                {
                  text: 'Nenhuma limitação durante a criação de elementos nos personagens',
                },
                {
                  text: 'Livros ilimitados por projeto',
                },
                {
                  text: 'Capítulos ilimitados por livro',
                },
                {
                  text: 'Cenas ilimitadas por capítulo',
                },
                {
                  text: 'Caixas de ideas ilimitadas',
                },
                {
                  text: 'Arquivos ilimitados por caixa de ideia',
                },
                {
                  text: '20 imagens por arquivo',
                },
                {
                  text: 'Suporte rápido via e-mail',
                },
              ]}
              onSelectPlan={handleSubscribe}
              revalidateInTime="Por mês"
              title="Mensal"
              amount={prices[0].amount}
              description="Ideal para escritores que buscam um planejamento eficiente e organizado para seus livros. Com uma variedade de recursos e ferramentas poderosas, a Magiscrita oferece suporte abrangente para todas as etapas do processo de escrita, desde a concepção inicial até a finalização do manuscrito."
            />

            <PricingCard
              buttonIsDisabled={userIsPro}
              priceId={prices[1].id}
              features={[
                {
                  text: 'Projeto ilimitados',
                },
                {
                  text: '5 compartilhamento com outros usuários por projeto',
                },
                {
                  text: 'Acesso a 10 projetos de outros usuários na opção de compartilhamento',
                },
                {
                  text: 'Personagens ilimitados por projeto',
                },
                {
                  text: 'Nenhuma limitação durante a criação de elementos nos personagens',
                },
                {
                  text: 'Livros ilimitados por projeto',
                },
                {
                  text: 'Capítulos ilimitados por livro',
                },
                {
                  text: 'Cenas ilimitadas por capítulo',
                },
                {
                  text: 'Caixas de ideas ilimitadas',
                },
                {
                  text: 'Arquivos ilimitados por caixa de ideia',
                },
                {
                  text: '20 imagens por arquivo',
                },
                {
                  text: 'Suporte rápido via e-mail',
                },
              ]}
              onSelectPlan={handleSubscribe}
              revalidateInTime="A cada 6 meses"
              title="Semestral"
              amount={prices[1].amount}
              description="Ideal para escritores que buscam um planejamento eficiente e organizado para seus livros. Com uma variedade de recursos e ferramentas poderosas, a Magiscrita oferece suporte abrangente para todas as etapas do processo de escrita, desde a concepção inicial até a finalização do manuscrito."
            />

            <PricingCard
              buttonIsDisabled={userIsPro}
              priceId={prices[2].id}
              features={[
                {
                  text: 'Projeto ilimitados',
                },
                {
                  text: '5 compartilhamento com outros usuários por projeto',
                },
                {
                  text: 'Acesso a 10 projetos de outros usuários na opção de compartilhamento',
                },
                {
                  text: 'Personagens ilimitados por projeto',
                },
                {
                  text: 'Nenhuma limitação durante a criação de elementos nos personagens',
                },
                {
                  text: 'Livros ilimitados por projeto',
                },
                {
                  text: 'Capítulos ilimitados por livro',
                },
                {
                  text: 'Cenas ilimitadas por capítulo',
                },
                {
                  text: 'Caixas de ideas ilimitadas',
                },
                {
                  text: 'Arquivos ilimitados por caixa de ideia',
                },
                {
                  text: '20 imagens por arquivo',
                },
                {
                  text: 'Suporte rápido via e-mail',
                },
              ]}
              onSelectPlan={handleSubscribe}
              revalidateInTime="Anual"
              title="Anual"
              amount={prices[2].amount}
              description="Ideal para escritores que buscam um planejamento eficiente e organizado para seus livros. Com uma variedade de recursos e ferramentas poderosas, a Magiscrita oferece suporte abrangente para todas as etapas do processo de escrita, desde a concepção inicial até a finalização do manuscrito."
            />

            <PricingCard
              buttonIsDisabled={userIsPro}
              priceId={prices[3].id}
              features={[
                {
                  text: 'Acesso a uma comunidade exclusiva com contato direto com os desenvolvedores do projeto',
                },
                {
                  text: 'Nenhum valor adicional será cobrado por qualquer novidade ou serviço disponibilizado pela nossa plataforma.',
                },
                {
                  text: 'Acesso antecipado a qualquer nova funcionalidade.',
                },
                {
                  text: 'Sua opinião levada em conta: Ao adquirir a compra unica, você pode dar ideais do que quer ver na plataforma',
                },
                {
                  text: 'Acesso vitalicio sem necessidade de renovações.',
                },
                {
                  text: 'Você colabora diretamente para manter o projeto vivo.',
                },
                {
                  text: 'Projeto ilimitados',
                },
                {
                  text: 'Compartilhamentos ilimitados com outros usuários por projeto',
                },
                {
                  text: 'Acesso ilimitados a projetos de outros usuários opção de compartilhamento',
                },
                {
                  text: 'Personagens ilimitados por projeto',
                },
                {
                  text: 'Nenhuma limitação durante a criação de elementos nos personagens',
                },
                {
                  text: 'Livros ilimitados por projeto',
                },
                {
                  text: 'Capítulos ilimitados por livro',
                },
                {
                  text: 'Cenas ilimitadas por capítulo',
                },
                {
                  text: 'Caixas de ideas ilimitadas',
                },
                {
                  text: 'Arquivos ilimitados por caixa de ideia',
                },
                {
                  text: 'Imagens ilimitadas por arquivo',
                },
                {
                  text: 'Suporte 24 horas',
                },
              ]}
              onSelectPlan={handleSubscribe}
              revalidateInTime="Acesso vitalicio"
              title="Compra única"
              amount={prices[3].amount}
              description="A compra de pagamento único é uma opção vantajosa para escritores que buscam manter a persistência em seus projetos literários. Ao optar por essa modalidade de aquisição, o escritor efetua um único pagamento e adquire acesso vitalício ou por um período prolongado aos recursos e benefícios oferecidos pela plataforma de suporte à escrita. Essa opção de compra irá desaparecer em breve!"
            />
          </PricingTable>
        </PricingPageBodyContainer>
      </PricingPTBRPageContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { prices } = await getPricesRequest()

  return {
    props: {
      prices,
    },
    revalidate: 60 * 60 * 24, // 1 day
  }
}
