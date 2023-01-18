import { ReactNode } from 'react'
import { Error } from '../../components/Error'
import { HeaderProject } from '../../components/HeaderProject'
import { ProjectNavigation } from '../../components/ProjectNavigation'
import { ProjectContainer, ProjectPageLayoutContainer } from './styles'

interface IProjectPageLayout {
  children?: ReactNode

  projectName: string
  projectId: string
  paths?: string[]
  loading?: boolean
  isScrolling?: boolean
  inError: boolean
}

export function ProjectPageLayout({
  children,
  projectName,
  projectId,
  loading = true,
  paths,
  isScrolling = false,
  inError,
}: IProjectPageLayout) {
  return (
    <>
      <ProjectNavigation isFullDisabled={inError} />
      <ProjectPageLayoutContainer>
        <HeaderProject
          projectId={projectId}
          projectName={projectName}
          loading={loading}
          paths={paths}
        />
        {inError ? (
          <Error
            statusCode={404}
            errorMessage="Não foi possível encontrar o projeto. Volte a tela inicial e tente novamente..."
          />
        ) : (
          <ProjectContainer isScrolling={isScrolling}>
            {children}
          </ProjectContainer>
        )}
      </ProjectPageLayoutContainer>
    </>
  )
}
