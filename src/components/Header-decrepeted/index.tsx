import Image from 'next/image'

import { ButtonsContent, HeaderContainer, ImageContent } from './styles'

import aloneLogoImg from '../../assets/logos/aloneLogo.svg'
import logoImg from '../../assets/logos/logo.svg'

import { ProjectorScreen, SignIn, UserCirclePlus } from 'phosphor-react'
import { AvatarWeb } from '@components/usefull/Avatar'
import { useRouter } from 'next/router'
import { useWindowSize } from '@hooks/useWindow'
import { ButtonIcon, ButtonLabel, ButtonRoot } from '@components/usefull/Button'
import { useUser } from '@hooks/useUser'

export function Header() {
  const router = useRouter()

  const windowSize = useWindowSize()
  const smallWindow = windowSize.width! < 786

  const { user } = useUser()

  return (
    <HeaderContainer>
      <ImageContent>
        {smallWindow ? (
          <Image src={aloneLogoImg} alt="Magiscrita" priority />
        ) : (
          <Image src={logoImg} alt="Magiscrita" priority />
        )}
      </ImageContent>

      <ButtonsContent>
        {user ? (
          <>
            <ButtonRoot wid="hug" onClick={() => router.push('/projects')}>
              <ButtonIcon>
                <ProjectorScreen />
              </ButtonIcon>
              <ButtonLabel>Dashboard</ButtonLabel>
            </ButtonRoot>
            <AvatarWeb src={user?.avatar_url ?? undefined} size="xsm" />
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
