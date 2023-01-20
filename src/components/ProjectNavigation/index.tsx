import {
  DeletePopUp,
  Label,
  Logo,
  Options,
  ProjectNavigationContainer,
} from './styles'

import logoSvg from '../../assets/logos/aloneLogo.svg'
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
} from 'phosphor-react'
import { useContext, useState } from 'react'
import { ProjectsContext } from '../../contexts/projects'
import { UserContext } from '../../contexts/user'
import { InterfaceContext } from '../../contexts/interface'
import { useRouter } from 'next/router'
import Image from 'next/image'

interface IProjectNavigationProps {
  isFullDisabled?: boolean
}

export function ProjectNavigation({
  isFullDisabled = false,
}: IProjectNavigationProps) {
  const [onOpenDelete, setOnOpenDelete] = useState(false)

  const { deleteProject, projects, loading } = useContext(ProjectsContext)
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
    router.replace('/projects')
    await deleteProject(id as string)
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
            alt=""
            onClick={() => router.replace('/projects')}
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
                  icon={<SortDescending weight="bold" />}
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
                  icon={<SortAscending weight="bold" />}
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
                  icon={<ArrowFatLinesUp weight="bold" />}
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
                  icon={<ArrowFatLinesDown weight="bold" />}
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
                  icon={<ArrowLineUp weight="bold" />}
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
                  icon={<ArrowLineDown weight="bold" />}
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
          <Label
            size="xxs"
            onClick={() => {
              router.replace(`/project/${id}`)
              setNavigatorProjectIsOpen(false)
            }}
          >
            Projeto
            <Button
              disabled={isFullDisabled || !!loading}
              type="button"
              wid={navigatorProjectIsOpen ? 'full' : 'hug'}
              align="center"
              icon={<House weight="bold" />}
            />
          </Label>
          <Label
            size="xxs"
            onClick={() => {
              router.replace(`/project/${id}/plot`)
              setNavigatorProjectIsOpen(false)
            }}
          >
            Plot
            <Button
              disabled={isFullDisabled || !!loading}
              type="button"
              wid={navigatorProjectIsOpen ? 'full' : 'hug'}
              align="center"
              icon={<BookOpen weight="bold" />}
              variant={onWindow === 'plot' ? 'active' : 'default'}
            />
          </Label>
          <Label
            size="xxs"
            onClick={() => {
              router.replace(`/project/${id}/books`)
              setNavigatorProjectIsOpen(false)
            }}
          >
            Livros
            <Button
              type="button"
              disabled
              wid={navigatorProjectIsOpen ? 'full' : 'hug'}
              align="center"
              icon={<Books weight="bold" />}
              variant={onWindow === 'books' ? 'active' : 'default'}
            />
          </Label>
          <Label
            size="xxs"
            onClick={() => {
              router.replace(`/project/${id}/planets`)
              setNavigatorProjectIsOpen(false)
            }}
          >
            Planetas
            <Button
              type="button"
              disabled
              wid={navigatorProjectIsOpen ? 'full' : 'hug'}
              align="center"
              icon={<Planet weight="bold" />}
              variant={onWindow === 'planets' ? 'active' : 'default'}
            />
          </Label>
          <Label
            size="xxs"
            onClick={() => {
              router.replace(`/project/${id}/nations`)
              setNavigatorProjectIsOpen(false)
            }}
          >
            Nações
            <Button
              type="button"
              disabled
              wid={navigatorProjectIsOpen ? 'full' : 'hug'}
              align="center"
              icon={<MapTrifold weight="bold" />}
              variant={onWindow === 'nations' ? 'active' : 'default'}
            />
          </Label>
          <Label
            size="xxs"
            onClick={() => {
              router.replace(`/project/${id}/persons`)

              setNavigatorProjectIsOpen(false)
            }}
          >
            Personagens
            <Button
              disabled={isFullDisabled || !!loading}
              type="button"
              wid={navigatorProjectIsOpen ? 'full' : 'hug'}
              align="center"
              icon={<UserFocus weight="bold" />}
              variant={onWindow === 'persons' ? 'active' : 'default'}
            />
          </Label>
          <Label
            size="xxs"
            onClick={() => {
              router.replace(`/project/${id}/cities`)
              setNavigatorProjectIsOpen(false)
            }}
          >
            Cidades
            <Button
              type="button"
              disabled
              wid={navigatorProjectIsOpen ? 'full' : 'hug'}
              align="center"
              icon={<Buildings weight="bold" />}
              variant={onWindow === 'cities' ? 'active' : 'default'}
            />
          </Label>
          <Label
            size="xxs"
            onClick={() => {
              router.replace(`/project/${id}/races`)
              setNavigatorProjectIsOpen(false)
            }}
          >
            Raças
            <Button
              type="button"
              disabled
              wid={navigatorProjectIsOpen ? 'full' : 'hug'}
              align="center"
              icon={<Alien weight="bold" />}
              variant={onWindow === 'races' ? 'active' : 'default'}
            />
          </Label>
          <Label
            size="xxs"
            onClick={() => {
              router.replace(`/project/${id}/religions`)
              setNavigatorProjectIsOpen(false)
            }}
          >
            Religiões
            <Button
              type="button"
              disabled
              wid={navigatorProjectIsOpen ? 'full' : 'hug'}
              align="center"
              icon={<Atom weight="bold" />}
              variant={onWindow === 'religions' ? 'active' : 'default'}
            />
          </Label>
          <Label
            size="xxs"
            onClick={() => {
              router.replace(`/project/${id}/powers`)
              setNavigatorProjectIsOpen(false)
            }}
          >
            Poderes
            <Button
              type="button"
              disabled
              wid={navigatorProjectIsOpen ? 'full' : 'hug'}
              align="center"
              icon={<Lightning weight="bold" />}
              variant={onWindow === 'powers' ? 'active' : 'default'}
            />
          </Label>
          <Label
            size="xxs"
            onClick={() => {
              router.replace(`/project/${id}/familys`)
              setNavigatorProjectIsOpen(false)
            }}
          >
            Famílias
            <Button
              type="button"
              disabled
              wid={navigatorProjectIsOpen ? 'full' : 'hug'}
              align="center"
              icon={<UsersFour weight="bold" />}
              variant={onWindow === 'familys' ? 'active' : 'default'}
            />
          </Label>
          <Label
            size="xxs"
            onClick={() => {
              router.replace(`/project/${id}/languages`)
              setNavigatorProjectIsOpen(false)
            }}
          >
            Linguagens
            <Button
              type="button"
              disabled
              wid={navigatorProjectIsOpen ? 'full' : 'hug'}
              align="center"
              icon={<Translate weight="bold" />}
              variant={onWindow === 'languages' ? 'active' : 'default'}
            />
          </Label>
          <Label
            size="xxs"
            onClick={() => {
              router.replace(`/project/${id}/institutions`)
              setNavigatorProjectIsOpen(false)
            }}
          >
            Instituições
            <Button
              type="button"
              disabled
              wid={navigatorProjectIsOpen ? 'full' : 'hug'}
              align="center"
              icon={<Bank weight="bold" />}
              variant={onWindow === 'institutions' ? 'active' : 'default'}
            />
          </Label>
          <Label
            size="xxs"
            onClick={() => {
              router.replace(`/project/${id}/timelines`)
              setNavigatorProjectIsOpen(false)
            }}
          >
            Time lines
            <Button
              type="button"
              disabled
              wid={navigatorProjectIsOpen ? 'full' : 'hug'}
              align="center"
              icon={<Clock weight="bold" />}
              variant={onWindow === 'timelines' ? 'active' : 'default'}
            />
          </Label>

          <Label
            size="xxs"
            onClick={() => {
              router.replace(`/project/${id}/mindMap`)
              setNavigatorProjectIsOpen(false)
            }}
          >
            Mind map
            <Button
              type="button"
              wid={navigatorProjectIsOpen ? 'full' : 'hug'}
              align="center"
              icon={<TreeStructure weight="bold" />}
              variant={onWindow === 'mindMap' ? 'active' : 'default'}
            />
          </Label>

          <Label size="xxs">
            Configurações
            <Button
              disabled={isFullDisabled || !!loading}
              type="button"
              wid={navigatorProjectIsOpen ? 'full' : 'hug'}
              align="center"
              icon={<Gear weight="bold" />}
              onClick={() => {
                router.replace(`/project/${id}/settings`)
                setNavigatorProjectIsOpen(false)
              }}
              variant={onWindow === 'settings' ? 'active' : 'default'}
            />
          </Label>
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
                  icon={<Trash weight="bold" />}
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
              icon={<Trash weight="bold" />}
              label="Apagar permanentemente"
              onClick={() => handleDeleteProject()}
            />
            <Button
              disabled={isFullDisabled || !!loading}
              type="button"
              align="center"
              icon={<XSquare weight="bold" />}
              label="Cancelar"
              onClick={() => setOnOpenDelete(false)}
            />
          </Box>
        </DeletePopUp>
      )}
    </>
  )
}
