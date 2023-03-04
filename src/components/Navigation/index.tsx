import { ButtonsContainer, NavigationBarContainer } from './styles'

import LogoToLeft from '../../assets/logos/logo.svg'
import {
  Bookmark,
  ListChecks,
  ProjectorScreenChart,
  UserCircle,
  UsersThree,
  XCircle,
} from 'phosphor-react'
import { useContext } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { InterfaceContext } from '@contexts/interface'
import { useWindowSize } from '@hooks/useWindow'
import { ButtonIcon, ButtonLabel, ButtonRoot } from '@components/usefull/Button'
import { Text } from '@components/usefull/Text'

export function NavigationBar() {
  const { navIsOpen, setNavIsOpen } = useContext(InterfaceContext)

  const router = useRouter()
  const location = router.pathname.split('/')[1]

  const windowSize = useWindowSize()
  const smallWindow = windowSize.width! < 786

  return (
    <NavigationBarContainer navIsOpen={navIsOpen}>
      <Image
        src={LogoToLeft}
        alt="Ognare"
        onClick={() => {
          router.push('/projects')
          setNavIsOpen(false)
        }}
        priority
      />
      <button
        className="close"
        type="button"
        onClick={() => setNavIsOpen(false)}
      >
        <XCircle size={32} />
      </button>
      <ButtonsContainer>
        {smallWindow && (
          <>
            <Text
              size="xs"
              css={{
                marginBottom: '-$4',
              }}
            >
              Ferramentas
            </Text>

            <Text
              size="xs"
              css={{
                marginTop: '$4',
                marginBottom: '-$4',
              }}
            >
              Projetos
            </Text>
          </>
        )}

        <ButtonRoot
          type="button"
          variant={location === 'projects' ? 'active' : 'default'}
          onClick={() => {
            router.push('/projects')
            smallWindow && setNavIsOpen(false)
          }}
        >
          <ButtonIcon>
            <ProjectorScreenChart />
          </ButtonIcon>

          <ButtonLabel>Projetos</ButtonLabel>
        </ButtonRoot>

        <ButtonRoot
          type="button"
          variant={location === 'myProjects' ? 'active' : 'default'}
          onClick={() => {
            router.push('/myProjects')
            smallWindow && setNavIsOpen(false)
          }}
        >
          <ButtonIcon>
            <Bookmark />
          </ButtonIcon>

          <ButtonLabel>Meus projetos</ButtonLabel>
        </ButtonRoot>

        {/* <ButtonRoot
        type='button'
          label="Recentes"
          variant={location === 'recent' ? 'active' : 'default'}
          icon={<Clock />}
          onClick={() => {
            router.push('/recent')
            smallWindow && setNavIsOpen(false)
          }}
        /> */}

        <ButtonRoot
          type="button"
          variant={location === 'shared' ? 'active' : 'default'}
          onClick={() => {
            router.push('/shared')
            smallWindow && setNavIsOpen(false)
          }}
        >
          <ButtonIcon>
            <UsersThree />
          </ButtonIcon>

          <ButtonLabel>Compartilhados comigo</ButtonLabel>
        </ButtonRoot>

        <ButtonRoot
          type="button"
          variant={location === 'todo' ? 'active' : 'default'}
          onClick={() => {
            router.push('/todo')
            smallWindow && setNavIsOpen(false)
          }}
          disabled
        >
          <ButtonIcon>
            <ListChecks />
          </ButtonIcon>

          <ButtonLabel>To-Do</ButtonLabel>
        </ButtonRoot>
        {/* <ButtonRoot
        type='button'
          label="Pro"
          disabled
          variant={location === '*****' ? 'active' : 'default'}
          icon={<Star color="#f97700" />}
        /> */}
        {smallWindow && (
          <>
            <Text
              size="xs"
              css={{
                marginTop: '$4',
                marginBottom: '-$4',
              }}
            >
              Informações do usuário
            </Text>
            <ButtonRoot
              type="button"
              onClick={() => {
                router.push('/user/settings')
              }}
            >
              <ButtonIcon>
                <UserCircle />
              </ButtonIcon>

              <ButtonLabel>Usuário</ButtonLabel>
            </ButtonRoot>
          </>
        )}
      </ButtonsContainer>
    </NavigationBarContainer>
  )
}
