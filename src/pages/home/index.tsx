import { NextSeo } from 'next-seo'
import { HomeContent, HomePageContainer, SideInfo } from './styles'

import aloneLogoImg from '../../assets/logos/logo.png'
import Image from 'next/image'
import { Header } from '@components/Header'
import { Text } from '@components/usefull/Text'
import { Heading } from '@components/usefull/Heading'
import { GetServerSideProps } from 'next'
import { getUserRequest, refreshSessionRequest } from '@api/userRequest'
import { IResponse } from '@api/responses/IResponse'
import { IUser, IUserResponse } from '@api/responsesTypes/user/IUser'

interface IHomePageProps {
  user: IUser | null
}

export default function HomePage({ user }: IHomePageProps) {
  const userIsPro = user
    ? user.account.subscription?.status === 'active'
    : false

  return (
    <>
      <NextSeo
        title="Magiscrita | Dando origem as suas ideias"
        description="Um lugar organizado para você criar as suas histórias"
      />

      <HomePageContainer>
        <Header user={user} userIsPro={userIsPro} />

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

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  let response: IResponse<IUserResponse> | null

  response = await getUserRequest({
    cookies: {
      token: String(req.cookies['@og-token']),
      refreshToken: String(req.cookies['@og-refresh-token']),
    },
  })

  if (response.error) {
    const refreshed = await refreshSessionRequest({ setToken: true })

    if (refreshed.error) {
      return {
        props: {
          user: null,
        },
      }
    } else {
      response = await getUserRequest()
    }
  }

  return {
    props: {
      user: response.data ? response.data?.user : null,
    },
  }
}
