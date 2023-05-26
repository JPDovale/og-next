import { useUser } from '@hooks/useUser'
import Image from 'next/image'
import { useRouter } from 'next/router'
import {
  ButtonsContent,
  ExplorerHeader,
  HeaderContainer,
  ImageContent,
  Space,
} from './styles'

import aloneLogoImg from '../../assets/logos/ogLogo.png'

import {
  Article,
  Files,
  ProjectorScreen,
  SignIn,
  // Star,
  UserCirclePlus,
} from 'phosphor-react'
import { ButtonIcon, ButtonLabel, ButtonRoot } from '@components/usefull/Button'
import { AvatarWeb } from '@components/usefull/Avatar'
import Link from 'next/link'

interface IHeaderProps {
  disableShadow?: boolean
}

export function Header({ disableShadow = false }: IHeaderProps) {
  const router = useRouter()
  // const location = router.pathname.split('/')[1]

  const {
    user,
    // userIsPro
  } = useUser()

  return (
    <>
      <HeaderContainer disableShadow={disableShadow}>
        <p>.</p>

        <ExplorerHeader>
          {/* {!userIsPro && (
            <ButtonRoot
              variant="noShadow"
              size="xs"
              wid="hug"
              onClick={() => router.push('/pricing/pt_br')}
              disabled={location === 'pricing'}
            >
              <ButtonIcon>
                <Star weight="fill" color="#f97700" />
              </ButtonIcon>
              <ButtonLabel>Preços</ButtonLabel>
            </ButtonRoot>
          )} */}

          <Link href={'/blog/posts'}>
            <ButtonRoot as="a" variant="noShadow" size="xs" wid="hug">
              <ButtonIcon>
                <Article weight="fill" />
              </ButtonIcon>
              <ButtonLabel>Blog</ButtonLabel>
            </ButtonRoot>
          </Link>

          <Link href={'/docs'}>
            <ButtonRoot as="a" variant="noShadow" size="xs" wid="hug">
              <ButtonIcon>
                <Files weight="fill" />
              </ButtonIcon>
              <ButtonLabel>Documentação</ButtonLabel>
            </ButtonRoot>
          </Link>
        </ExplorerHeader>

        <ImageContent>
          <Image src={aloneLogoImg} alt="Magiscrita" quality={100} priority />
        </ImageContent>

        <ButtonsContent>
          {user ? (
            <>
              <ButtonRoot
                wid="hug"
                variant="noShadow"
                size="xs"
                onClick={() => router.push('/projects')}
              >
                <ButtonIcon>
                  <ProjectorScreen />
                </ButtonIcon>
                <ButtonLabel>Dashboard</ButtonLabel>
              </ButtonRoot>

              <AvatarWeb
                src={user?.infos.avatar.url}
                alt={user?.infos.avatar.alt}
                size="xsm"
              />
            </>
          ) : (
            <>
              <Link href={'/register'}>
                <ButtonRoot as="a" wid="hug" size="xs" variant="noShadow">
                  <ButtonIcon>
                    <UserCirclePlus />
                  </ButtonIcon>
                  <ButtonLabel>Registrar</ButtonLabel>
                </ButtonRoot>
              </Link>

              <Link href={'/login'}>
                <ButtonRoot as="a" size="xs" variant="noShadow" wid="hug">
                  <ButtonIcon>
                    <SignIn />
                  </ButtonIcon>
                  <ButtonLabel>Login</ButtonLabel>
                </ButtonRoot>
              </Link>
            </>
          )}
        </ButtonsContent>
      </HeaderContainer>
      <Space />
    </>
  )
}
