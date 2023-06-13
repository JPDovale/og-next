import { ButtonsContainer, NavigationBarContainer } from './styles'
import * as Dialog from '@radix-ui/react-dialog'
import LogoToLeft from '../../assets/logos/logo.png'
import {
  Article,
  Atom,
  Bookmark,
  FilePlus,
  Files,
  ListChecks,
  Package,
  ProjectorScreenChart,
  Star,
  UserCircle,
  UsersThree,
  XCircle,
} from 'phosphor-react'
import { useContext, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { InterfaceContext } from '@contexts/interface'
import { useWindowSize } from '@hooks/useWindow'
import { ButtonIcon, ButtonLabel, ButtonRoot } from '@components/usefull/Button'
import { Text } from '@components/usefull/Text'
import { useProjects } from '@hooks/useProjects'
import { useUser } from '@hooks/useUser'
import { ContainerGrid } from '@components/usefull/ContainerGrid'
import Link from 'next/link'
import pk from '../../../package.json'
import { NewProjectModal } from '@components/ProjectsComponents/NewProjectModal'
import { NewBoxModal } from '@components/BoxesComponents/NewBoxModal'

export function NavigationBar() {
  const [modalCreateProjectIsOpen, setModalCreateProjectIsOpen] =
    useState(false)

  const { navIsOpen, setNavIsOpen, theme } = useContext(InterfaceContext)

  const router = useRouter()
  const location = router.pathname.split('/')[1]

  const { smallWindow } = useWindowSize()

  const { projectsThisUser, projectsSharedWithUser } = useProjects()
  const { userIsPro } = useUser()

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

      {smallWindow && (
        <Link href="/docs/versions" style={{ width: '100%' }}>
          <Text
            css={{
              lineHeight: 0,
              opacity: 0.6,
              cursor: 'pointer',
              transition: 'ease-in-out 250ms',
              textAlign: 'center',
              '&:hover': { opacity: 1, scale: 1.02 },
            }}
            family="body"
          >
            Versão: {pk.version} Beta
          </Text>
        </Link>
      )}

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

        <ContainerGrid padding={0} columns={smallWindow ? 2 : 1}>
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

          {smallWindow && (
            <Dialog.Root
              open={modalCreateProjectIsOpen}
              onOpenChange={setModalCreateProjectIsOpen}
            >
              <Dialog.Trigger asChild>
                <ButtonRoot
                  type="button"
                  title="Criar projeto"
                  size="sm"
                  align="left"
                >
                  <ButtonIcon>
                    <FilePlus size={24} />
                  </ButtonIcon>

                  <ButtonLabel>Criar projeto</ButtonLabel>
                </ButtonRoot>
              </Dialog.Trigger>

              <NewProjectModal
                onSuccessCreateProject={() =>
                  setModalCreateProjectIsOpen(false)
                }
              />
            </Dialog.Root>
          )}
        </ContainerGrid>

        <ContainerGrid padding={0} columns={smallWindow ? 2 : 1}>
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

          {smallWindow && (
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <ButtonRoot
                  type="button"
                  title="Criar box de ideias"
                  size="sm"
                  align="left"
                >
                  <ButtonIcon>
                    <Package size={24} />
                  </ButtonIcon>

                  <ButtonLabel>Criar box</ButtonLabel>
                </ButtonRoot>
              </Dialog.Trigger>

              <NewBoxModal />
            </Dialog.Root>
          )}
        </ContainerGrid>

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
          disabled={!userIsPro}
        >
          <ButtonIcon>
            <ListChecks />
          </ButtonIcon>

          {navIsOpen && <ButtonLabel>To-Do</ButtonLabel>}
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
          title="Blog"
          align={navIsOpen ? 'left' : 'center'}
          css={{ marginTop: '$8' }}
          onClick={() => {
            router.push('/blog/posts')
            smallWindow && setNavIsOpen(false)
          }}
        >
          <ButtonIcon>
            <Article />
          </ButtonIcon>

          {navIsOpen && <ButtonLabel>Blog</ButtonLabel>}
        </ButtonRoot>
        <ButtonRoot
          type="button"
          size="sm"
          title="Documentação"
          align={navIsOpen ? 'left' : 'center'}
          onClick={() => {
            router.push('/docs')
            smallWindow && setNavIsOpen(false)
          }}
        >
          <ButtonIcon>
            <Files />
          </ButtonIcon>

          {navIsOpen && <ButtonLabel>Documentação</ButtonLabel>}
        </ButtonRoot>

        <ButtonRoot
          type="button"
          size="sm"
          title="AI"
          align={navIsOpen ? 'left' : 'center'}
          onClick={() => {
            router.push('https://forgecontentai.magiscrita.com/')
            smallWindow && setNavIsOpen(false)
          }}
        >
          <ButtonIcon>
            <Atom />
          </ButtonIcon>

          {navIsOpen && <ButtonLabel>Forge Content AI</ButtonLabel>}
        </ButtonRoot>

        {!userIsPro && (
          <ButtonRoot
            type="button"
            title="Pro"
            size="sm"
            align={navIsOpen ? 'left' : 'center'}
            onClick={() => router.push('/pricing/pt_br')}
          >
            <ButtonIcon>
              <Star color="#f97700" weight="fill" />
            </ButtonIcon>

            {navIsOpen && <ButtonLabel>Pro</ButtonLabel>}
          </ButtonRoot>
        )}
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
