import {
  DeletePopUp,
  Label,
  Logo,
  Options,
  OptionsContainer,
  ProjectNavigationContainer,
} from './styles'

import logoSvg from '../../../assets/logos/logo.png'
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
    await callEvent.quit()
  }

  return (
    <>
      <ProjectNavigationContainer isOpen={navigatorProjectIsOpen}>
        <Logo darkMode={theme === 'dark'}>
          <Image
            height={100}
            width={100}
            className="logo"
            src={logoSvg}
            alt="Magiscrita"
            onClick={() => router.push('/projects')}
            quality={100}
            priority
          />
        </Logo>

        <OptionsContainer>
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
                <Label size="sm" height="shorter" family="body" weight="bold">
                  A para Z
                  <ButtonRoot
                    type="button"
                    size="xs"
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

                <Label size="sm" height="shorter" family="body" weight="bold">
                  Z para A
                  <ButtonRoot
                    type="button"
                    size="xs"
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

                <Label size="sm" height="shorter" family="body" weight="bold">
                  Mais novos primeiro
                  <ButtonRoot
                    type="button"
                    size="xs"
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

                <Label size="sm" height="shorter" family="body" weight="bold">
                  Mais velhos primeiro
                  <ButtonRoot
                    type="button"
                    size="xs"
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

                <Label size="sm" height="shorter" family="body" weight="bold">
                  Atualização mais recente primeiro
                  <ButtonRoot
                    type="button"
                    size="xs"
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

                <Label size="sm" height="shorter" family="body" weight="bold">
                  Atualização mais antiga primeiro
                  <ButtonRoot
                    type="button"
                    size="xs"
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
                <Label size="sm" height="shorter" family="body" weight="bold">
                  Dark mode
                  <ButtonRoot
                    type="button"
                    size="xs"
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
                <Label size="sm" height="shorter" family="body" weight="bold">
                  Light mode
                  <ButtonRoot
                    type="button"
                    size="xs"
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
            <Label size="sm" height="shorter" family="body" weight="bold">
              {navigatorProjectIsOpen && 'Projeto'}
              <ButtonRoot
                disabled={isFullDisabled || !!loadingProject}
                title="Projeto"
                type="button"
                size="xs"
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

            {project?.features.timeLines && (
              <Label size="sm" height="shorter" family="body" weight="bold">
                {navigatorProjectIsOpen && 'Linhas de tempo'}

                <ButtonRoot
                  title="Linhas de tempo"
                  type="button"
                  size="xs"
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
            )}

            {project?.features.books && (
              <Label size="sm" height="shorter" family="body" weight="bold">
                {navigatorProjectIsOpen && 'livros'}

                <ButtonRoot
                  title="livros"
                  type="button"
                  size="xs"
                  disabled={isFullDisabled || !!loadingProject}
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
            )}

            {project?.features.plot && (
              <Label size="sm" height="shorter" family="body" weight="bold">
                {navigatorProjectIsOpen && 'Plot'}

                <ButtonRoot
                  title="Plot"
                  disabled={isFullDisabled || !!loadingProject}
                  type="button"
                  size="xs"
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
            )}

            {project?.features.planets && (
              <Label size="sm" height="shorter" family="body" weight="bold">
                {navigatorProjectIsOpen && 'Planetas'}

                <ButtonRoot
                  title="Planetas"
                  type="button"
                  size="xs"
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
            )}

            {project?.features.nations && (
              <Label size="sm" height="shorter" family="body" weight="bold">
                {navigatorProjectIsOpen && 'Nações'}

                <ButtonRoot
                  title="Nações"
                  type="button"
                  size="xs"
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
            )}

            {project?.features.persons && (
              <Label size="sm" height="shorter" family="body" weight="bold">
                {navigatorProjectIsOpen && 'Personagens'}

                <ButtonRoot
                  title="Personagens"
                  disabled={isFullDisabled || !!loadingProject}
                  type="button"
                  size="xs"
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
            )}

            {project?.features.citys && (
              <Label size="sm" height="shorter" family="body" weight="bold">
                {navigatorProjectIsOpen && 'Cidades'}

                <ButtonRoot
                  title="Cidades"
                  type="button"
                  size="xs"
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
            )}

            {project?.features.races && (
              <Label size="sm" height="shorter" family="body" weight="bold">
                {navigatorProjectIsOpen && 'Raças'}

                <ButtonRoot
                  title="Raças"
                  type="button"
                  size="xs"
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
            )}

            {project?.features.religions && (
              <Label size="sm" height="shorter" family="body" weight="bold">
                {navigatorProjectIsOpen && 'Religiões'}

                <ButtonRoot
                  title="Religiões"
                  type="button"
                  size="xs"
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
            )}

            {project?.features.powers && (
              <Label size="sm" height="shorter" family="body" weight="bold">
                {navigatorProjectIsOpen && 'Poderes'}

                <ButtonRoot
                  title="Poderes"
                  type="button"
                  size="xs"
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
            )}

            {project?.features.familys && (
              <Label size="sm" height="shorter" family="body" weight="bold">
                {navigatorProjectIsOpen && 'Famílias'}

                <ButtonRoot
                  title="Famílias"
                  type="button"
                  size="xs"
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
            )}

            {project?.features.languages && (
              <Label size="sm" height="shorter" family="body" weight="bold">
                {navigatorProjectIsOpen && 'Linguagens'}

                <ButtonRoot
                  title="Linguagens"
                  type="button"
                  size="xs"
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
            )}

            {project?.features.institutions && (
              <Label size="sm" height="shorter" family="body" weight="bold">
                {navigatorProjectIsOpen && 'Instituições'}

                <ButtonRoot
                  title="Instituições"
                  type="button"
                  size="xs"
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
            )}

            {/* <Label size=xxs" weight='bold'>
            Mind map
            <ButtonRoot
              type="button"
              size='xsm'
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

            <Label size="sm" height="shorter" family="body" weight="bold">
              {navigatorProjectIsOpen && 'Configurações'}

              <ButtonRoot
                title="Configurações"
                disabled={isFullDisabled || !!loadingProject}
                type="button"
                size="xs"
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
            {project?.creator.id !== user?.account.id && (
              <Label size="sm" height="shorter" family="body" weight="bold">
                {navigatorProjectIsOpen && 'Sair do projeto'}

                <ButtonRoot
                  title="Sair do projeto"
                  disabled={isFullDisabled || !!loadingProject}
                  type="button"
                  size="xs"
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
            {project?.creator.id === user?.account.id && (
              <>
                <Label
                  size="xxs"
                  css={{
                    paddingTop: !navigatorProjectIsOpen ? '$8' : '',
                    color: '$fullError',
                  }}
                >
                  {navigatorProjectIsOpen && 'Apagar projeto'}

                  <ButtonRoot
                    title="Apagar projeto"
                    disabled={isFullDisabled || !!loadingProject}
                    type="button"
                    size="xs"
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
        </OptionsContainer>
      </ProjectNavigationContainer>
      {onOpenDelete && project?.creator.id === user?.account.id && (
        <DeletePopUp>
          <Box as="div">
            <Text size="sm">
              Tem certeza que quer apagar o projeto? Será impossível desfazer
              isso.
            </Text>
            <ButtonRoot
              disabled={isFullDisabled || !!loadingProject}
              type="button"
              size="xs"
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
              size="xs"
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

      {onOpenQuit && project?.creator.id !== user?.account.id && (
        <DeletePopUp>
          <Box as="div">
            <Text size="sm">
              Tem certeza que quer sair do projeto? Será impossível desfazer
              isso. Você não poderá mais ver o projeto na sua aba de projetos.
            </Text>
            <ButtonRoot
              disabled={isFullDisabled || !!loadingProject}
              type="button"
              size="xs"
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
              size="xs"
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
