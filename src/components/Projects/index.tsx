import { ProjectorScreenChart } from 'phosphor-react'
import { useContext, useMemo } from 'react'
import { IProjectResponse } from '../../api/responsesTypes/IProjcetResponse'
import { InterfaceContext } from '../../contexts/interface'
import { UserContext } from '../../contexts/user'
import { orderElements } from '../../services/orderElements'
import { CardProject } from '../CardProject'
import { ListEmpty } from '../ListEmpty'
import { ProjectsContainer } from './styles'

interface IProjectProps {
  projects: IProjectResponse[]
  listEmptyMessage: string
  query?: string
}

export function Projects({
  projects,
  listEmptyMessage,
  query = '',
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
          icon={<ProjectorScreenChart size={98} />}
          message={
            query ? `Nenhum projeto encontrado para ${query}` : listEmptyMessage
          }
        />
      )}
    </ProjectsContainer>
  )
}
