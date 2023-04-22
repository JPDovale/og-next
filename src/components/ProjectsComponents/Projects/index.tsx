import { IProjectResponse } from '@api/responsesTypes/IProjectResponse'
import { ListEmpty } from '@components/usefull/ListEmpty'
import { InterfaceContext } from '@contexts/interface'
import { useUser } from '@hooks/useUser'
import { ProjectorScreenChart } from 'phosphor-react'
import { useContext } from 'react'
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
  query,
  isLoading,
  isFirst = false,
}: IProjectProps) {
  const { isList, navIsOpen } = useContext(InterfaceContext)
  const { user } = useUser()

  return (
    <ProjectsContainer
      isFirst={isFirst}
      isList={isList}
      navIsOpen={navIsOpen}
      isEmpty={projects && !projects[0]}
    >
      {isList && (
        <CardProject project={{} as IProjectResponse} isList="example" />
      )}

      {projects?.map((project) => {
        return (
          <CardProject
            key={project.id}
            isList={isList}
            isSharable={project?.user.id === user?.id}
            project={project}
          />
        )
      })}

      {projects && !projects[0] && (
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
