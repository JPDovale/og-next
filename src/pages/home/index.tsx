import { NextSeo } from 'next-seo'
import { HomePageContainer } from './styles'

import logo from '../../assets/logos/logoToDown.svg'
import Image from 'next/image'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    router.push('/login')
  }, [router])

  return (
    <>
      <NextSeo
        title="Dando origem as suas ideias | Ognare"
        description="Um lugar organizado para você criar as suas histórias"
      />
      <HomePageContainer>
        <Image
          width={300}
          src={logo}
          alt="Garota segurando uma pena abaixo de uma noite estrelada seguido pelo texto 'Ognare'"
          quality={100}
          priority
        />
      </HomePageContainer>
    </>
  )
}
