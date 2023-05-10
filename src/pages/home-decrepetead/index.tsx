import { NextSeo } from 'next-seo'
import { HomeContent, HomePageContainer, SideInfo } from './styles'

import aloneLogoImg from '../../assets/logos/aloneLogo.svg'
import Image from 'next/image'
import { Header } from '@components/Header'
import { Text } from '@components/usefull/Text'
import { Heading } from '@components/usefull/Heading'

export default function HomePage() {
  return (
    <>
      <NextSeo
        title="Magiscrita | Dando origem as suas ideias"
        description="Um lugar organizado para você criar as suas histórias"
      />

      <HomePageContainer>
        <Header />

        <HomeContent>
          <SideInfo>
            <Heading>
              Bem-vindo(a) ao lugar onde todas as suas histórias se originam.
            </Heading>

            <Image src={aloneLogoImg} alt="" />

            <Text>
              Crie mundos inteiros com o poder da criatividade. Não deixe que o
              silêncio cale as suas origens.
            </Text>

            <Text size="3xl">Um mundo inteiro feito de histórias.</Text>
            <Text size="lg">Crie a sua com a gente!</Text>
          </SideInfo>
        </HomeContent>
      </HomePageContainer>
    </>
  )
}
