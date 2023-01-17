import { HomePageContainer } from './styles'

import logo from '../../assets/logos/logoToDown.svg'
import Image from 'next/image'
import { useContext, useEffect } from 'react'
import { UserContext } from '../../contexts/user'
import { useRouter } from 'next/router'

export default function HomePage() {
  const { userLogged } = useContext(UserContext)

  const router = useRouter()

  useEffect(() => {
    if (!userLogged) {
      router.replace('/login')
    }
  }, [userLogged, router])

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
