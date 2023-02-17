import {
  DeletePopUp,
  Label,
  Logo,
  Options,
  ProjectNavigationContainer,
} from './styles'

import logoSvg from '../../../assets/logos/aloneLogo.svg'
import { Box, Button, Text } from '@og-ui/react'
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
  TreeStructure,
  UserMinus,
} from 'phosphor-react'
import { useContext, useState } from 'react'

import { useRouter } from 'next/router'
import Image from 'next/image'
import { ProjectsContext } from '@contexts/projects'
import { UserContext } from '@contexts/user'
import { InterfaceContext } from '@contexts/interface'

interface IProjectNavigationProps {
  isFullDisabled?: boolean
}

export function ProjectNavigation({
  isFullDisabled = false,
}: IProjectNavigationProps) {
  const [onOpenDelete, setOnOpenDelete] = useState(false)
  const [onOpenQuit, setOnOpenQuit] = useState(false)

  const { deleteProject, projects, loading, quitProject } =
    useContext(ProjectsContext)
  const { user } = useContext(UserContext)
  const {
    navigatorProjectIsOpen,
    setNavigatorProjectIsOpen,
    orderBy,
    setOrderBy,
  } = useContext(InterfaceContext)

  const router = useRouter()

  const pathname = router.pathname
  const { id } = router.query

  const project = projects?.find((project) => project.id === id)
  const onWindow = pathname.split('/')[3]

  // const smallWindow = screen.width < 786

  async function handleDeleteProject() {
    router.push('/projects')
    await deleteProject(id as string)
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
            <Text css={{ color: '$base700' }}>Opções de visualização</Text>
            <Text size="xs" css={{ color: '$base800' }}>
              Ordenar por
            </Text>
            <Options isOpen={navigatorProjectIsOpen}>
              <Label size="xxs">
                A para Z
                <Button
                  type="button"
                  wid={navigatorProjectIsOpen ? 'full' : 'hug'}
                  align="center"
                  icon={<SortDescending />}
                  variant={orderBy === 'a-z' ? 'active' : 'default'}
                  disabled={isFullDisabled || !!loading}
                  onClick={() => {
                    setOrderBy(`a-z`)
                    setNavigatorProjectIsOpen(false)
                  }}
                />
              </Label>

              <Label size="xxs">
                Z para A
                <Button
                  type="button"
                  wid={navigatorProjectIsOpen ? 'full' : 'hug'}
                  align="center"
                  icon={<SortAscending />}
                  variant={orderBy === 'z-a' ? 'active' : 'default'}
                  disabled={isFullDisabled || !!loading}
                  onClick={() => {
                    setOrderBy(`z-a`)
                    setNavigatorProjectIsOpen(false)
                  }}
                />
              </Label>

              <Label size="xxs">
                Mais novos primeiro
                <Button
                  type="button"
                  wid={navigatorProjectIsOpen ? 'full' : 'hug'}
                  align="center"
                  icon={<ArrowFatLinesUp />}
                  variant={orderBy === 'time-asc' ? 'active' : 'default'}
                  disabled={isFullDisabled || !!loading}
                  onClick={() => {
                    setOrderBy(`time-asc`)
                    setNavigatorProjectIsOpen(false)
                  }}
                />
              </Label>

              <Label size="xxs">
                Mais velhos primeiro
                <Button
                  type="button"
                  wid={navigatorProjectIsOpen ? 'full' : 'hug'}
                  align="center"
                  icon={<ArrowFatLinesDown />}
                  variant={orderBy === 'time-desc' ? 'active' : 'default'}
                  disabled={isFullDisabled || !!loading}
                  onClick={() => {
                    setOrderBy(`time-desc`)
                    setNavigatorProjectIsOpen(false)
                  }}
                />
              </Label>

              <Label size="xxs">
                Atualização mais recente primeiro
                <Button
                  type="button"
                  wid={navigatorProjectIsOpen ? 'full' : 'hug'}
                  align="center"
                  icon={<ArrowLineUp />}
                  variant={orderBy === 'update-asc' ? 'active' : 'default'}
                  disabled={isFullDisabled || !!loading}
                  onClick={() => {
                    setOrderBy(`update-asc`)
                    setNavigatorProjectIsOpen(false)
                  }}
                />
              </Label>

              <Label size="xxs">
                Atualização mais antiga primeiro
                <Button
                  type="button"
                  wid={navigatorProjectIsOpen ? 'full' : 'hug'}
                  align="center"
                  icon={<ArrowLineDown />}
                  variant={orderBy === 'update-desc' ? 'active' : 'default'}
                  disabled={isFullDisabled || !!loading}
                  onClick={() => {
                    setOrderBy(`update-desc`)
                    setNavigatorProjectIsOpen(false)
                  }}
                />
              </Label>
            </Options>
          </>
        )}

        {navigatorProjectIsOpen && (
          <Text css={{ color: '$base700' }}>Opções do projeto</Text>
        )}
        <Options isOpen={navigatorProjectIsOpen}>
          <Label size="xxs">
            Projeto
            <Button
              disabled={isFullDisabled || !!loading}
              type="button"
              wid={navigatorProjectIsOpen ? 'full' : 'hug'}
              align="center"
              icon={<House />}
              onClick={() => {
                router.push(`/project/${id}`)
                setNavigatorProjectIsOpen(false)
              }}
            />
          </Label>

          <Label size="xxs">
            Livros
            <Button
              type="button"
              wid={navigatorProjectIsOpen ? 'full' : 'hug'}
              align="center"
              icon={<Books />}
              variant={onWindow === 'books' ? 'active' : 'default'}
              onClick={() => {
                router.push(`/project/${id}/books`)
                setNavigatorProjectIsOpen(false)
              }}
            />
          </Label>

          <Label size="xxs">
            Plot
            <Button
              disabled={isFullDisabled || !!loading}
              type="button"
              wid={navigatorProjectIsOpen ? 'full' : 'hug'}
              align="center"
              icon={<BookOpen />}
              variant={onWindow === 'plot' ? 'active' : 'default'}
              onClick={() => {
                router.push(`/project/${id}/plot`)
                setNavigatorProjectIsOpen(false)
              }}
            />
          </Label>

          <Label size="xxs">
            Planetas
            <Button
              type="button"
              disabled
              wid={navigatorProjectIsOpen ? 'full' : 'hug'}
              align="center"
              icon={<Planet />}
              variant={onWindow === 'planets' ? 'active' : 'default'}
              onClick={() => {
                router.push(`/project/${id}/planets`)
                setNavigatorProjectIsOpen(false)
              }}
            />
          </Label>
          <Label size="xxs">
            Nações
            <Button
              type="button"
              disabled
              wid={navigatorProjectIsOpen ? 'full' : 'hug'}
              align="center"
              icon={<MapTrifold />}
              variant={onWindow === 'nations' ? 'active' : 'default'}
              onClick={() => {
                router.push(`/project/${id}/nations`)
                setNavigatorProjectIsOpen(false)
              }}
            />
          </Label>
          <Label size="xxs">
            Personagens
            <Button
              disabled={isFullDisabled || !!loading}
              type="button"
              wid={navigatorProjectIsOpen ? 'full' : 'hug'}
              align="center"
              icon={<UserFocus />}
              variant={onWindow === 'persons' ? 'active' : 'default'}
              onClick={() => {
                router.push(`/project/${id}/persons`)
                setNavigatorProjectIsOpen(false)
              }}
            />
          </Label>
          <Label size="xxs">
            Cidades
            <Button
              type="button"
              disabled
              wid={navigatorProjectIsOpen ? 'full' : 'hug'}
              align="center"
              icon={<Buildings />}
              variant={onWindow === 'cities' ? 'active' : 'default'}
              onClick={() => {
                router.push(`/project/${id}/cities`)
                setNavigatorProjectIsOpen(false)
              }}
            />
          </Label>
          <Label size="xxs">
            Raças
            <Button
              type="button"
              disabled
              wid={navigatorProjectIsOpen ? 'full' : 'hug'}
              align="center"
              icon={<Alien />}
              variant={onWindow === 'races' ? 'active' : 'default'}
              onClick={() => {
                router.push(`/project/${id}/races`)
                setNavigatorProjectIsOpen(false)
              }}
            />
          </Label>
          <Label size="xxs">
            Religiões
            <Button
              type="button"
              disabled
              wid={navigatorProjectIsOpen ? 'full' : 'hug'}
              align="center"
              icon={<Atom />}
              variant={onWindow === 'religions' ? 'active' : 'default'}
              onClick={() => {
                router.push(`/project/${id}/religions`)
                setNavigatorProjectIsOpen(false)
              }}
            />
          </Label>
          <Label size="xxs">
            Poderes
            <Button
              type="button"
              disabled
              wid={navigatorProjectIsOpen ? 'full' : 'hug'}
              align="center"
              icon={<Lightning />}
              variant={onWindow === 'powers' ? 'active' : 'default'}
              onClick={() => {
                router.push(`/project/${id}/powers`)
                setNavigatorProjectIsOpen(false)
              }}
            />
          </Label>
          <Label size="xxs">
            Famílias
            <Button
              type="button"
              disabled
              wid={navigatorProjectIsOpen ? 'full' : 'hug'}
              align="center"
              icon={<UsersFour />}
              variant={onWindow === 'familys' ? 'active' : 'default'}
              onClick={() => {
                router.push(`/project/${id}/familys`)
                setNavigatorProjectIsOpen(false)
              }}
            />
          </Label>
          <Label size="xxs">
            Linguagens
            <Button
              type="button"
              disabled
              wid={navigatorProjectIsOpen ? 'full' : 'hug'}
              align="center"
              icon={<Translate />}
              variant={onWindow === 'languages' ? 'active' : 'default'}
              onClick={() => {
                router.push(`/project/${id}/languages`)
                setNavigatorProjectIsOpen(false)
              }}
            />
          </Label>
          <Label size="xxs">
            Instituições
            <Button
              type="button"
              disabled
              wid={navigatorProjectIsOpen ? 'full' : 'hug'}
              align="center"
              icon={<Bank />}
              variant={onWindow === 'institutions' ? 'active' : 'default'}
              onClick={() => {
                router.push(`/project/${id}/institutions`)
                setNavigatorProjectIsOpen(false)
              }}
            />
          </Label>
          <Label size="xxs">
            Time lines
            <Button
              type="button"
              disabled
              wid={navigatorProjectIsOpen ? 'full' : 'hug'}
              align="center"
              icon={<Clock />}
              variant={onWindow === 'timelines' ? 'active' : 'default'}
              onClick={() => {
                router.push(`/project/${id}/timelines`)
                setNavigatorProjectIsOpen(false)
              }}
            />
          </Label>

          <Label size="xxs">
            Mind map
            <Button
              type="button"
              wid={navigatorProjectIsOpen ? 'full' : 'hug'}
              align="center"
              icon={<TreeStructure />}
              variant={onWindow === 'mindMap' ? 'active' : 'default'}
              onClick={() => {
                router.push(`/project/${id}/mindMap`)
                setNavigatorProjectIsOpen(false)
              }}
            />
          </Label>

          <Label size="xxs">
            Configurações
            <Button
              disabled={isFullDisabled || !!loading}
              type="button"
              wid={navigatorProjectIsOpen ? 'full' : 'hug'}
              align="center"
              icon={<Gear />}
              onClick={() => {
                router.push(`/project/${id}/settings`)
                setNavigatorProjectIsOpen(false)
              }}
              variant={onWindow === 'settings' ? 'active' : 'default'}
            />
          </Label>
          {project?.createdPerUser !== user?.id && (
            <Label size="xxs">
              Sair
              <Button
                disabled={isFullDisabled || !!loading}
                type="button"
                css={{
                  background: 'DarkRed',
                }}
                wid={navigatorProjectIsOpen ? 'full' : 'hug'}
                align="center"
                icon={<UserMinus />}
                onClick={() => setOnOpenQuit(true)}
              />
            </Label>
          )}
          {project?.createdPerUser === user?.id && (
            <>
              <Label
                size="xxs"
                css={{
                  paddingTop: !navigatorProjectIsOpen ? '$8' : '',
                  color: '$errorDefault',
                }}
              >
                Apagar
                <Button
                  disabled={isFullDisabled || !!loading}
                  type="button"
                  css={{
                    background: 'DarkRed',
                  }}
                  wid={navigatorProjectIsOpen ? 'full' : 'hug'}
                  align="center"
                  icon={<Trash />}
                  onClick={() => setOnOpenDelete(true)}
                />
              </Label>
            </>
          )}
        </Options>
      </ProjectNavigationContainer>
      {onOpenDelete && project?.createdPerUser === user?.id && (
        <DeletePopUp>
          <Box as="div">
            <Text size="sm">
              Tem certeza que quer apagar o projeto? Será impossível desfazer
              isso.
            </Text>
            <Button
              disabled={isFullDisabled || !!loading}
              type="button"
              css={{
                background: 'DarkRed',
              }}
              align="center"
              icon={<Trash />}
              label="Apagar permanentemente"
              onClick={() => handleDeleteProject()}
            />
            <Button
              disabled={isFullDisabled || !!loading}
              type="button"
              align="center"
              icon={<XSquare />}
              label="Cancelar"
              onClick={() => setOnOpenDelete(false)}
            />
          </Box>
        </DeletePopUp>
      )}

      {onOpenQuit && project?.createdPerUser !== user?.id && (
        <DeletePopUp>
          <Box as="div">
            <Text size="sm">
              Tem certeza que quer sair do projeto? Será impossível desfazer
              isso. Você não poderá mais ver o projeto na sua aba de projetos.
            </Text>
            <Button
              disabled={isFullDisabled || !!loading}
              type="button"
              css={{
                background: 'DarkRed',
              }}
              align="center"
              icon={<UserMinus />}
              label="Sair do projeto."
              onClick={handleQuitProject}
            />
            <Button
              disabled={isFullDisabled || !!loading}
              type="button"
              align="center"
              icon={<XSquare />}
              label="Cancelar"
              onClick={() => setOnOpenDelete(false)}
            />
          </Box>
        </DeletePopUp>
      )}
    </>
  )
}
