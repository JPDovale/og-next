import { ButtonsContainer, NavigationBarContainer } from './styles'

import LogoToLeft from '../../assets/logos/logoOG.png'
import {
  Bookmark,
  ListChecks,
  Package,
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
import { useProjects } from '@hooks/useProjects'

export function NavigationBar() {
  const { navIsOpen, setNavIsOpen, theme } = useContext(InterfaceContext)

  const router = useRouter()
  const location = router.pathname.split('/')[1]

  const windowSize = useWindowSize()
  const smallWindow = windowSize.width! < 786

  const { projectsThisUser, projectsSharedWithUser } = useProjects()

  return (
    <NavigationBarContainer navIsOpen={navIsOpen} darkMode={theme === 'dark'}>
      <Image
        src={LogoToLeft}
        alt="Magiscrita"
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
          <Text
            size="xs"
            css={{
              marginTop: '$4',
              marginBottom: '-$4',
            }}
          >
            Projetos
          </Text>
        )}

        <ButtonRoot
          type="button"
          title="Todos os projetos"
          align={navIsOpen ? 'left' : 'center'}
          variant={location === 'projects' ? 'active' : 'default'}
          size="sm"
          onClick={() => {
            router.push('/projects')
            smallWindow && setNavIsOpen(false)
          }}
        >
          <ButtonIcon>
            <ProjectorScreenChart />
          </ButtonIcon>

          {navIsOpen && <ButtonLabel>Projetos</ButtonLabel>}
        </ButtonRoot>

        {projectsThisUser?.length > 0 &&
          projectsSharedWithUser?.length !== 0 && (
            <ButtonRoot
              type="button"
              size="sm"
              title="Meus projetos"
              align={navIsOpen ? 'left' : 'center'}
              variant={location === 'myProjects' ? 'active' : 'default'}
              onClick={() => {
                router.push('/myProjects')
                smallWindow && setNavIsOpen(false)
              }}
            >
              <ButtonIcon>
                <Bookmark />
              </ButtonIcon>

              {navIsOpen && <ButtonLabel>Meus projetos</ButtonLabel>}
            </ButtonRoot>
          )}

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

        {projectsSharedWithUser?.length > 0 && (
          <ButtonRoot
            type="button"
            size="sm"
            align={navIsOpen ? 'left' : 'center'}
            title="Projetos compartilhados comigo"
            variant={location === 'shared' ? 'active' : 'default'}
            onClick={() => {
              router.push('/shared')
              smallWindow && setNavIsOpen(false)
            }}
          >
            <ButtonIcon>
              <UsersThree />
            </ButtonIcon>

            {navIsOpen && <ButtonLabel>Compartilhados comigo</ButtonLabel>}
          </ButtonRoot>
        )}

        <ButtonRoot
          type="button"
          size="sm"
          align={navIsOpen ? 'left' : 'center'}
          title="Caixotes de ideias"
          variant={location === 'boxes' ? 'active' : 'default'}
          onClick={() => {
            router.push('/boxes')
            smallWindow && setNavIsOpen(false)
          }}
        >
          <ButtonIcon>
            <Package />
          </ButtonIcon>

          {navIsOpen && <ButtonLabel>Boxes</ButtonLabel>}
        </ButtonRoot>

        <ButtonRoot
          type="button"
          size="sm"
          title="To-Do"
          align={navIsOpen ? 'left' : 'center'}
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

          {navIsOpen && <ButtonLabel>To-Do</ButtonLabel>}
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
              size="sm"
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
