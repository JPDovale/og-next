import { useUser } from '@hooks/useUser'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { ButtonsContent, HeaderContainer, ImageContent } from './styles'

import aloneLogoImg from '../../assets/logos/ogLogo.png'

import { ProjectorScreen, SignIn, UserCirclePlus } from 'phosphor-react'
import { ButtonIcon, ButtonLabel, ButtonRoot } from '@components/usefull/Button'
import { AvatarWeb } from '@components/usefull/Avatar'

export function Header() {
  const router = useRouter()

  const { user } = useUser()

  return (
    <HeaderContainer>
      <ImageContent>
        <Image src={aloneLogoImg} alt="Magiscrita" quality={100} priority />
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
