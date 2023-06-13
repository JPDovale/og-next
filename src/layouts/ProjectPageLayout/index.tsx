import * as Dialog from '@radix-ui/react-dialog'
import { HeaderProject } from '@components/ProjectsComponents/HeaderProject'
import { ProjectNavigation } from '@components/ProjectsComponents/ProjectNavigation'
import { Error } from '@components/usefull/Error'
import { useProject } from '@hooks/useProject'
import { ReactNode } from 'react'

import { ProjectContainer, ProjectPageLayoutContainer } from './styles'
import { AlertProjectNeedsUpdateModal } from '@components/ProjectsComponents/AlertProjectNeedsUpdateModal'

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
  const { project } = useProject(projectId)

  const inConfigPage = !!paths?.find(
    (path) => path.toLowerCase().trim() === 'configurações',
  )
  const isToShowAlert =
    project?.initialDate.year === 'Não definido' &&
    project.features.timeLines &&
    !inConfigPage

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
          >
            {children}
            <Dialog.Root open={isToShowAlert}>
              <AlertProjectNeedsUpdateModal projectId={projectId} />
            </Dialog.Root>
          </ProjectContainer>
        )}
      </ProjectPageLayoutContainer>
    </>
  )
}
