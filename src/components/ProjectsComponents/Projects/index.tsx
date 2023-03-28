import { IProjectResponse } from '@api/responsesTypes/IProjcetResponse'
import { ListEmpty } from '@components/usefull/ListEmpty'
import { InterfaceContext } from '@contexts/interface'
import { UserContext } from '@contexts/user'
import { orderElements } from '@services/orderElements'
import { ProjectorScreenChart } from 'phosphor-react'
import { useContext, useMemo } from 'react'
import { CardProject } from '../CardProject'
import { ProjectsContainer } from './styles'

interface IProjectProps {
  projects: IProjectResponse[]
  listEmptyMessage: string
  query?: string
  isLoading: boolean
  isFirst?: boolean
}

export function Projects({
  projects,
  listEmptyMessage,
  query = '',
  isLoading,
  isFirst = false,
}: IProjectProps) {
  const { isList, navIsOpen, orderBy } = useContext(InterfaceContext)
  const { user } = useContext(UserContext)

  const projectsOrd = useMemo(() => {
    const projectsInOrd = orderElements(projects, orderBy) as IProjectResponse[]

    return projectsInOrd?.filter((project) =>
      project.name.toLowerCase().includes(query.toLowerCase()),
    )
  }, [query, orderBy, projects])

  return (
    <ProjectsContainer
      isFirst={isFirst}
      isList={isList}
      navIsOpen={navIsOpen}
      isEmpty={projectsOrd && !projectsOrd[0]}
    >
      {isList && (
        <CardProject project={{} as IProjectResponse} isList="example" />
      )}

      {projectsOrd?.map((project) => {
        return (
          <CardProject
            key={project.id}
            isList={isList}
            isSharable={project.createdPerUser === user?.id}
            project={project}
          />
        )
      })}

      {projectsOrd && !projectsOrd[0] && (
        <ListEmpty
          isLoading={isLoading}
          icon={<ProjectorScreenChart size={98} />}
          message={
            query ? `Nenhum projeto encontrado para ${query}` : listEmptyMessage
          }
          isInLine
        />
      )}
    </ProjectsContainer>
  )
}
