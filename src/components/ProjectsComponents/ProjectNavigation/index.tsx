import {
  DeletePopUp,
  Label,
  Logo,
  Options,
  ProjectNavigationContainer,
} from './styles'

import logoSvg from '../../../assets/logos/aloneLogo.svg'
import {
  ArrowFatLinesDown,
  ArrowFatLinesUp,
  ArrowLineDown,
  ArrowLineUp,
  Alien,
  Atom,
  Bank,
  BookOpen,
  Gear,
  SortAscending,
  SortDescending,
  Books,
  Buildings,
  Clock,
  Lightning,
  MapTrifold,
  Planet,
  Translate,
  Trash,
  UserFocus,
  XCircle,
  UsersFour,
  XSquare,
  House,
  // TreeStructure,
  UserMinus,
  Moon,
  Sun,
} from 'phosphor-react'
import { useContext, useState } from 'react'

import { useRouter } from 'next/router'
import Image from 'next/image'
import { ProjectsContext } from '@contexts/projects'
import { InterfaceContext } from '@contexts/interface'
import { ButtonIcon, ButtonLabel, ButtonRoot } from '@components/usefull/Button'
import { Text } from '@components/usefull/Text'
import { Box } from '@components/usefull/Box'
import { useScroll } from '@hooks/useScroll'
import { useProject } from '@hooks/useProject'
import { useUser } from '@hooks/useUser'

interface IProjectNavigationProps {
  isFullDisabled?: boolean
}

export function ProjectNavigation({
  isFullDisabled = false,
}: IProjectNavigationProps) {
  const [onOpenDelete, setOnOpenDelete] = useState(false)
  const [onOpenQuit, setOnOpenQuit] = useState(false)

  const { quitProject } = useContext(ProjectsContext)
  const {
    navigatorProjectIsOpen,
    setNavigatorProjectIsOpen,
    orderBy,
    setOrderBy,
    theme,
    setThemeFunction,
  } = useContext(InterfaceContext)

  const router = useRouter()

  const pathname = router.pathname
  const { id } = router.query

  const { handleScroll, scrollRef } = useScroll<HTMLDivElement>()

  const { project, loadingProject, callEvent } = useProject(id as string)
  const { user } = useUser()

  const onWindow = pathname.split('/')[3]

  // const smallWindow = screen.width < 786

  async function handleDeleteProject() {
    router.push('/projects')
    await callEvent.delete()
  }

  async function handleQuitProject() {
    router.push('/projects')
    await quitProject({ projectId: id as string })
  }

  return (
    <>
      <ProjectNavigationContainer isOpen={navigatorProjectIsOpen}>
        <Logo>
          <Image
            height={50}
            width={50}
            className="logo"
            src={logoSvg}
            alt="Ognare"
            onClick={() => router.push('/projects')}
            priority
          />
        </Logo>
        {navigatorProjectIsOpen && (
          <button
            type="button"
            className="close"
            onClick={() => setNavigatorProjectIsOpen(false)}
          >
            <XCircle size={24} />
          </button>
        )}

        {navigatorProjectIsOpen && (
          <>
            <Text>Opções de visualização</Text>
            <Text size="xs" css={{ color: '$base800' }}>
              Ordenar por
            </Text>
            <Options isOpen={navigatorProjectIsOpen}>
              <Label size="xxs" weight="bold">
                A para Z
                <ButtonRoot
                  type="button"
                  wid={navigatorProjectIsOpen ? 'full' : 'hug'}
                  align="center"
                  variant={orderBy === 'a-z' ? 'active' : 'default'}
                  disabled={isFullDisabled || !!loadingProject}
                  onClick={() => {
                    setOrderBy(`a-z`)
                    setNavigatorProjectIsOpen(false)
                  }}
                >
                  <ButtonIcon>
                    <SortDescending />
                  </ButtonIcon>
                </ButtonRoot>
              </Label>

              <Label size="xxs" weight="bold">
                Z para A
                <ButtonRoot
                  type="button"
                  wid={navigatorProjectIsOpen ? 'full' : 'hug'}
                  align="center"
                  variant={orderBy === 'z-a' ? 'active' : 'default'}
                  disabled={isFullDisabled || !!loadingProject}
                  onClick={() => {
                    setOrderBy(`z-a`)
                    setNavigatorProjectIsOpen(false)
                  }}
                >
                  <ButtonIcon>
                    <SortAscending />
                  </ButtonIcon>
                </ButtonRoot>
              </Label>

              <Label size="xxs" weight="bold">
                Mais novos primeiro
                <ButtonRoot
                  type="button"
                  wid={navigatorProjectIsOpen ? 'full' : 'hug'}
                  align="center"
                  variant={orderBy === 'time-asc' ? 'active' : 'default'}
                  disabled={isFullDisabled || !!loadingProject}
                  onClick={() => {
                    setOrderBy(`time-asc`)
                    setNavigatorProjectIsOpen(false)
                  }}
                >
                  <ButtonIcon>
                    <ArrowFatLinesUp />
                  </ButtonIcon>
                </ButtonRoot>
              </Label>

              <Label size="xxs" weight="bold">
                Mais velhos primeiro
                <ButtonRoot
                  type="button"
                  wid={navigatorProjectIsOpen ? 'full' : 'hug'}
                  align="center"
                  variant={orderBy === 'time-desc' ? 'active' : 'default'}
                  disabled={isFullDisabled || !!loadingProject}
                  onClick={() => {
                    setOrderBy(`time-desc`)
                    setNavigatorProjectIsOpen(false)
                  }}
                >
                  <ButtonIcon>
                    <ArrowFatLinesDown />
                  </ButtonIcon>
                </ButtonRoot>
              </Label>

              <Label size="xxs" weight="bold">
                Atualização mais recente primeiro
                <ButtonRoot
                  type="button"
                  wid={navigatorProjectIsOpen ? 'full' : 'hug'}
                  align="center"
                  variant={orderBy === 'update-asc' ? 'active' : 'default'}
                  disabled={isFullDisabled || !!loadingProject}
                  onClick={() => {
                    setOrderBy(`update-asc`)
                    setNavigatorProjectIsOpen(false)
                  }}
                >
                  <ButtonIcon>
                    <ArrowLineUp />
                  </ButtonIcon>
                </ButtonRoot>
              </Label>

              <Label size="xxs" weight="bold">
                Atualização mais antiga primeiro
                <ButtonRoot
                  type="button"
                  wid={navigatorProjectIsOpen ? 'full' : 'hug'}
                  align="center"
                  variant={orderBy === 'update-desc' ? 'active' : 'default'}
                  disabled={isFullDisabled || !!loadingProject}
                  onClick={() => {
                    setOrderBy(`update-desc`)
                    setNavigatorProjectIsOpen(false)
                  }}
                >
                  <ButtonIcon>
                    <ArrowLineDown />
                  </ButtonIcon>
                </ButtonRoot>
              </Label>
            </Options>
            <Text size="xs" css={{ color: '$base800' }}>
              Tema
            </Text>
            <Options isOpen={navigatorProjectIsOpen}>
              <Label size="xxs" weight="bold">
                Dark mode
                <ButtonRoot
                  type="button"
                  wid={navigatorProjectIsOpen ? 'full' : 'hug'}
                  align="center"
                  variant={theme === 'dark' ? 'active' : 'default'}
                  disabled={isFullDisabled || !!loadingProject}
                  onClick={() => {
                    if (theme === 'dark') return
                    setThemeFunction()
                  }}
                >
                  <ButtonIcon>
                    <Moon />
                  </ButtonIcon>
                </ButtonRoot>
              </Label>
              <Label size="xxs" weight="bold">
                Light mode
                <ButtonRoot
                  type="button"
                  wid={navigatorProjectIsOpen ? 'full' : 'hug'}
                  align="center"
                  variant={theme === 'light' ? 'active' : 'default'}
                  disabled={isFullDisabled || !!loadingProject}
                  onClick={() => {
                    if (theme === 'light') return
                    setThemeFunction()
                  }}
                >
                  <ButtonIcon>
                    <Sun />
                  </ButtonIcon>
                </ButtonRoot>
              </Label>
            </Options>
          </>
        )}

        {navigatorProjectIsOpen && <Text>Opções do projeto</Text>}
        <Options
          ref={scrollRef}
          onScroll={handleScroll}
          isOpen={navigatorProjectIsOpen}
        >
          <Label size="xxs" weight="bold">
            Projeto
            <ButtonRoot
              disabled={isFullDisabled || !!loadingProject}
              type="button"
              wid={navigatorProjectIsOpen ? 'full' : 'hug'}
              align="center"
              onClick={() => {
                router.push(`/project/${id}`)
                setNavigatorProjectIsOpen(false)
              }}
            >
              <ButtonIcon>
                <House />
              </ButtonIcon>
            </ButtonRoot>
          </Label>

          <Label size="xxs" weight="bold">
            Livros
            <ButtonRoot
              type="button"
              wid={navigatorProjectIsOpen ? 'full' : 'hug'}
              align="center"
              variant={onWindow === 'books' ? 'active' : 'default'}
              onClick={() => {
                router.push(`/project/${id}/books`)
                setNavigatorProjectIsOpen(false)
              }}
            >
              <ButtonIcon>
                <Books />
              </ButtonIcon>
            </ButtonRoot>
          </Label>

          <Label size="xxs" weight="bold">
            Plot
            <ButtonRoot
              disabled={isFullDisabled || !!loadingProject}
              type="button"
              wid={navigatorProjectIsOpen ? 'full' : 'hug'}
              align="center"
              variant={onWindow === 'plot' ? 'active' : 'default'}
              onClick={() => {
                router.push(`/project/${id}/plot`)
                setNavigatorProjectIsOpen(false)
              }}
            >
              <ButtonIcon>
                <BookOpen />
              </ButtonIcon>
            </ButtonRoot>
          </Label>

          <Label size="xxs" weight="bold">
            Planetas
            <ButtonRoot
              type="button"
              disabled
              wid={navigatorProjectIsOpen ? 'full' : 'hug'}
              align="center"
              variant={onWindow === 'planets' ? 'active' : 'default'}
              onClick={() => {
                router.push(`/project/${id}/planets`)
                setNavigatorProjectIsOpen(false)
              }}
            >
              <ButtonIcon>
                <Planet />
              </ButtonIcon>
            </ButtonRoot>
          </Label>
          <Label size="xxs" weight="bold">
            Nações
            <ButtonRoot
              type="button"
              disabled
              wid={navigatorProjectIsOpen ? 'full' : 'hug'}
              align="center"
              variant={onWindow === 'nations' ? 'active' : 'default'}
              onClick={() => {
                router.push(`/project/${id}/nations`)
                setNavigatorProjectIsOpen(false)
              }}
            >
              <ButtonIcon>
                <MapTrifold />
              </ButtonIcon>
            </ButtonRoot>
          </Label>
          <Label size="xxs" weight="bold">
            Personagens
            <ButtonRoot
              disabled={isFullDisabled || !!loadingProject}
              type="button"
              wid={navigatorProjectIsOpen ? 'full' : 'hug'}
              align="center"
              variant={onWindow === 'persons' ? 'active' : 'default'}
              onClick={() => {
                router.push(`/project/${id}/persons`)
                setNavigatorProjectIsOpen(false)
              }}
            >
              <ButtonIcon>
                <UserFocus />
              </ButtonIcon>
            </ButtonRoot>
          </Label>
          <Label size="xxs" weight="bold">
            Cidades
            <ButtonRoot
              type="button"
              disabled
              wid={navigatorProjectIsOpen ? 'full' : 'hug'}
              align="center"
              variant={onWindow === 'cities' ? 'active' : 'default'}
              onClick={() => {
                router.push(`/project/${id}/cities`)
                setNavigatorProjectIsOpen(false)
              }}
            >
              <ButtonIcon>
                <Buildings />
              </ButtonIcon>
            </ButtonRoot>
          </Label>
          <Label size="xxs" weight="bold">
            Raças
            <ButtonRoot
              type="button"
              disabled
              wid={navigatorProjectIsOpen ? 'full' : 'hug'}
              align="center"
              variant={onWindow === 'races' ? 'active' : 'default'}
              onClick={() => {
                router.push(`/project/${id}/races`)
                setNavigatorProjectIsOpen(false)
              }}
            >
              <ButtonIcon>
                <Alien />
              </ButtonIcon>
            </ButtonRoot>
          </Label>
          <Label size="xxs" weight="bold">
            Religiões
            <ButtonRoot
              type="button"
              disabled
              wid={navigatorProjectIsOpen ? 'full' : 'hug'}
              align="center"
              variant={onWindow === 'religions' ? 'active' : 'default'}
              onClick={() => {
                router.push(`/project/${id}/religions`)
                setNavigatorProjectIsOpen(false)
              }}
            >
              <ButtonIcon>
                <Atom />
              </ButtonIcon>
            </ButtonRoot>
          </Label>
          <Label size="xxs" weight="bold">
            Poderes
            <ButtonRoot
              type="button"
              disabled
              wid={navigatorProjectIsOpen ? 'full' : 'hug'}
              align="center"
              variant={onWindow === 'powers' ? 'active' : 'default'}
              onClick={() => {
                router.push(`/project/${id}/powers`)
                setNavigatorProjectIsOpen(false)
              }}
            >
              <ButtonIcon>
                <Lightning />
              </ButtonIcon>
            </ButtonRoot>
          </Label>
          <Label size="xxs" weight="bold">
            Famílias
            <ButtonRoot
              type="button"
              disabled
              wid={navigatorProjectIsOpen ? 'full' : 'hug'}
              align="center"
              variant={onWindow === 'familys' ? 'active' : 'default'}
              onClick={() => {
                router.push(`/project/${id}/familys`)
                setNavigatorProjectIsOpen(false)
              }}
            >
              <ButtonIcon>
                <UsersFour />
              </ButtonIcon>
            </ButtonRoot>
          </Label>
          <Label size="xxs" weight="bold">
            Linguagens
            <ButtonRoot
              type="button"
              disabled
              wid={navigatorProjectIsOpen ? 'full' : 'hug'}
              align="center"
              variant={onWindow === 'languages' ? 'active' : 'default'}
              onClick={() => {
                router.push(`/project/${id}/languages`)
                setNavigatorProjectIsOpen(false)
              }}
            >
              <ButtonIcon>
                <Translate />
              </ButtonIcon>
            </ButtonRoot>
          </Label>
          <Label size="xxs" weight="bold">
            Instituições
            <ButtonRoot
              type="button"
              disabled
              wid={navigatorProjectIsOpen ? 'full' : 'hug'}
              align="center"
              variant={onWindow === 'institutions' ? 'active' : 'default'}
              onClick={() => {
                router.push(`/project/${id}/institutions`)
                setNavigatorProjectIsOpen(false)
              }}
            >
              <ButtonIcon>
                <Bank />
              </ButtonIcon>
            </ButtonRoot>
          </Label>
          <Label size="xxs" weight="bold">
            Timelines
            <ButtonRoot
              type="button"
              disabled
              wid={navigatorProjectIsOpen ? 'full' : 'hug'}
              align="center"
              variant={onWindow === 'timelines' ? 'active' : 'default'}
              onClick={() => {
                router.push(`/project/${id}/timelines`)
                setNavigatorProjectIsOpen(false)
              }}
            >
              <ButtonIcon>
                <Clock />
              </ButtonIcon>
            </ButtonRoot>
          </Label>

          {/* <Label size=xxs" weight='bold'>
            Mind map
            <ButtonRoot
              type="button"
              wid={navigatorProjectIsOpen ? 'full' : 'hug'}
              align="center"
              variant={onWindow === 'mindMap' ? 'active' : 'default'}
              onClick={() => {
                router.push(`/project/${id}/mindMap`)
                setNavigatorProjectIsOpen(false)
              }}
            >
              <ButtonIcon>
                <TreeStructure />
              </ButtonIcon>
            </ButtonRoot>
          </Label> */}

          <Label size="xxs" weight="bold">
            Configurações
            <ButtonRoot
              disabled={isFullDisabled || !!loadingProject}
              type="button"
              wid={navigatorProjectIsOpen ? 'full' : 'hug'}
              align="center"
              onClick={() => {
                router.push(`/project/${id}/settings`)
                setNavigatorProjectIsOpen(false)
              }}
              variant={onWindow === 'settings' ? 'active' : 'default'}
            >
              <ButtonIcon>
                <Gear />
              </ButtonIcon>
            </ButtonRoot>
          </Label>
          {project?.user.id !== user?.id && (
            <Label size="xxs" weight="bold">
              Sair
              <ButtonRoot
                disabled={isFullDisabled || !!loadingProject}
                type="button"
                css={{
                  background: 'DarkRed',
                }}
                wid={navigatorProjectIsOpen ? 'full' : 'hug'}
                align="center"
                onClick={() => setOnOpenQuit(true)}
              >
                <ButtonIcon>
                  <UserMinus />
                </ButtonIcon>
              </ButtonRoot>
            </Label>
          )}
          {project?.user.id === user?.id && (
            <>
              <Label
                size="xxs"
                css={{
                  paddingTop: !navigatorProjectIsOpen ? '$8' : '',
                  color: '$errorDefault',
                }}
              >
                Apagar
                <ButtonRoot
                  disabled={isFullDisabled || !!loadingProject}
                  type="button"
                  css={{
                    background: 'DarkRed',
                  }}
                  wid={navigatorProjectIsOpen ? 'full' : 'hug'}
                  align="center"
                  onClick={() => setOnOpenDelete(true)}
                >
                  <ButtonIcon>
                    <Trash />
                  </ButtonIcon>
                </ButtonRoot>
              </Label>
            </>
          )}
        </Options>
      </ProjectNavigationContainer>
      {onOpenDelete && project?.user.id === user?.id && (
        <DeletePopUp>
          <Box as="div">
            <Text size="sm">
              Tem certeza que quer apagar o projeto? Será impossível desfazer
              isso.
            </Text>
            <ButtonRoot
              disabled={isFullDisabled || !!loadingProject}
              type="button"
              css={{
                background: 'DarkRed',
              }}
              align="center"
              onClick={() => handleDeleteProject()}
            >
              <ButtonIcon>
                <Trash />
              </ButtonIcon>

              <ButtonLabel>Apagar permanentemente</ButtonLabel>
            </ButtonRoot>

            <ButtonRoot
              disabled={isFullDisabled || !!loadingProject}
              type="button"
              align="center"
              onClick={() => setOnOpenDelete(false)}
            >
              <ButtonIcon>
                <XSquare />
              </ButtonIcon>

              <ButtonLabel>Cancelar</ButtonLabel>
            </ButtonRoot>
          </Box>
        </DeletePopUp>
      )}

      {onOpenQuit && project?.user.id !== user?.id && (
        <DeletePopUp>
          <Box as="div">
            <Text size="sm">
              Tem certeza que quer sair do projeto? Será impossível desfazer
              isso. Você não poderá mais ver o projeto na sua aba de projetos.
            </Text>
            <ButtonRoot
              disabled={isFullDisabled || !!loadingProject}
              type="button"
              css={{
                background: 'DarkRed',
              }}
              align="center"
              onClick={handleQuitProject}
            >
              <ButtonIcon>
                <UserMinus />
              </ButtonIcon>

              <ButtonLabel>Sair do projeto</ButtonLabel>
            </ButtonRoot>

            <ButtonRoot
              disabled={isFullDisabled || !!loadingProject}
              type="button"
              align="center"
              onClick={() => setOnOpenDelete(false)}
            >
              <ButtonIcon>
                <XSquare />
              </ButtonIcon>

              <ButtonLabel>Cancelar</ButtonLabel>
            </ButtonRoot>
          </Box>
        </DeletePopUp>
      )}
    </>
  )
}
