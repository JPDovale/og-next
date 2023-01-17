import { HomePageContainer } from './styles'

import logo from '../../assets/logos/logoToDown.svg'
import Image from 'next/image'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/login')
  }, [router])

  return (
    <HomePageContainer>
      <Image
        width={300}
        src={logo}
        alt="Garota segurando uma pena abaixo de uma noite estrelada seguido pelo texto 'Ognare'"
        quality={100}
        priority
      />
    </HomePageContainer>
  )
}
