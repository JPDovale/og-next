import { HeaderProject } from '@components/ProjectsComponents/HeaderProject'
import { ProjectNavigation } from '@components/ProjectsComponents/ProjectNavigation'
import { Error } from '@components/usefull/Error'
import { ReactNode } from 'react'

import { ProjectContainer, ProjectPageLayoutContainer } from './styles'

interface IProjectPageLayout {
  children?: ReactNode

  projectName: string
  projectId: string
  paths?: string[]
  loading?: boolean
  isScrolling?: boolean
  isFullScreen?: boolean
  inError: boolean
  inErrorNotAuthorized?: boolean
  isTimelineInWindow?: boolean
}

export function ProjectPageLayout({
  children,
  projectName,
  projectId,
  loading = true,
  paths,
  isScrolling = false,
  isFullScreen = false,
  isTimelineInWindow = true,
  inError,
  inErrorNotAuthorized = false,
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
            errorMessage="Não foi possível encontrar o recurso. Volte a tela inicial e tente novamente..."
          />
        ) : loading ? (
          ''
        ) : inErrorNotAuthorized ? (
          <Error
            statusCode={401}
            errorMessage="Você não tem acesso a essas funções"
          />
        ) : (
          <ProjectContainer
            isFullScreen={isFullScreen}
            isScrolling={isScrolling}
            isTimelineInWindow={isTimelineInWindow}
          >
            {children}
          </ProjectContainer>
        )}
      </ProjectPageLayoutContainer>
    </>
  )
}
