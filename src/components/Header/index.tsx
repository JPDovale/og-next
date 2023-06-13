import Image from 'next/image'
import { useRouter } from 'next/router'
import {
  ButtonsContent,
  ExplorerHeader,
  HeaderContainer,
  ImageContent,
  Space,
} from './styles'

import aloneLogoLgImg from '../../assets/logos/ogLogoLG.png'
import aloneLogoDkImg from '../../assets/logos/ogLogoDK.png'

import { Article, Atom, Files, ProjectorScreen, Star } from 'phosphor-react'
import { ButtonIcon, ButtonLabel, ButtonRoot } from '@components/usefull/Button'
import Link from 'next/link'
import { useWindowSize } from '@hooks/useWindow'
import { useContext } from 'react'
import { InterfaceContext } from '@contexts/interface'

interface IHeaderProps {
  disableShadow?: boolean
}

export function Header({ disableShadow = false }: IHeaderProps) {
  const router = useRouter()
  const { smallWindow } = useWindowSize()
  const { theme } = useContext(InterfaceContext)

  return (
    <>
      <HeaderContainer disableShadow={disableShadow}>
        <p>.</p>

        <ExplorerHeader>
          <Link href={'/pricing/pt_br'}>
            <ButtonRoot as="a" variant="noShadow" size="xs" wid="hug">
              <ButtonIcon>
                <Star weight="fill" color="#f97700" />
              </ButtonIcon>
              <ButtonLabel>Preços</ButtonLabel>
            </ButtonRoot>
          </Link>

          {!smallWindow && (
            <>
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

              <Link href={'https://forgecontentai.magiscrita.com/'}>
                <ButtonRoot as="a" variant="noShadow" size="xs" wid="hug">
                  <ButtonIcon>
                    <Atom weight="fill" />
                  </ButtonIcon>
                  <ButtonLabel>Forge Content AI</ButtonLabel>
                </ButtonRoot>
              </Link>
            </>
          )}
        </ExplorerHeader>

        <ImageContent>
          <Image
            src={theme === 'light' ? aloneLogoLgImg : aloneLogoDkImg}
            alt="Magiscrita"
            quality={100}
            priority
          />
        </ImageContent>

        <ButtonsContent>
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
        </ButtonsContent>
      </HeaderContainer>
      <Space />
    </>
  )
}
