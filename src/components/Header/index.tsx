import { useContext } from 'react'
import Image from 'next/image'

import { ButtonsContent, HeaderContainer, ImageContent } from './styles'

import aloneLogoImg from '../../assets/logos/aloneLogo.svg'
import logoImg from '../../assets/logos/logo.svg'

import { ProjectorScreen, SignIn, UserCirclePlus } from 'phosphor-react'
import { AvatarWeb } from '@components/usefull/Avatar'
import { useRouter } from 'next/router'
import { useWindowSize } from '@hooks/useWindow'
import { UserContext } from '@contexts/user'
import { ButtonIcon, ButtonLabel, ButtonRoot } from '@components/usefull/Button'

export function Header() {
  const { userLogged, user } = useContext(UserContext)

  const router = useRouter()

  const windowSize = useWindowSize()
  const smallWindow = windowSize.width! < 786

  return (
    <HeaderContainer>
      <ImageContent>
        {smallWindow ? (
          <Image src={aloneLogoImg} alt="Ognare" priority />
        ) : (
          <Image src={logoImg} alt="Ognare" priority />
        )}
      </ImageContent>

      <ButtonsContent>
        {userLogged ? (
          <>
            <ButtonRoot wid="hug" onClick={() => router.push('/projects')}>
              <ButtonIcon>
                <ProjectorScreen />
              </ButtonIcon>
              <ButtonLabel>Dashboard</ButtonLabel>
            </ButtonRoot>
            <AvatarWeb src={user?.avatar?.url} size="xsm" />
          </>
        ) : (
          <>
            <ButtonRoot wid="hug" onClick={() => router.push('/register')}>
              <ButtonIcon>
                <UserCirclePlus />
              </ButtonIcon>
              <ButtonLabel>Registrar</ButtonLabel>
            </ButtonRoot>

            <ButtonRoot wid="hug" onClick={() => router.push('/login')}>
              <ButtonIcon>
                <SignIn />
              </ButtonIcon>
              <ButtonLabel>Login</ButtonLabel>
            </ButtonRoot>
          </>
        )}
      </ButtonsContent>
    </HeaderContainer>
  )
}
