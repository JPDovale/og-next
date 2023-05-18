import { ListEmpty } from '@components/usefull/ListEmpty'
import { IProjectPreview } from '@hooks/useProjects/entities/IProjectPreview'
import { useUser } from '@hooks/useUser'
import { ProjectorScreenChart } from 'phosphor-react'
import { CardProject } from '../CardProject'
import { ProjectsContainer } from './styles'

interface IProjectProps {
  projects: IProjectPreview[]
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
  const { user } = useUser()

  return (
    <ProjectsContainer isFirst={isFirst} isEmpty={projects && !projects[0]}>
      {projects?.map((project) => {
        return (
          <CardProject
            key={project.id}
            isSharable={project.creator.id === user?.id}
            project={project}
          />
        )
      })}

      {projects && !projects[0] && (
        <ListEmpty
          isLoading={isLoading}
          icon={<ProjectorScreenChart size={98} />}
          message={
            query
              ? `Nenhum projeto encontrado para: "${query}"... O campo de pesquisa mostra resultados para projetos que incluem o nome do criador, o nome do projeto ou a data de criação do projeto`
              : listEmptyMessage
          }
          isInLine
        />
      )}
    </ProjectsContainer>
  )
}
