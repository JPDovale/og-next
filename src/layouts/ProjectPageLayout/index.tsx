import { ReactNode } from 'react'
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
}

export function ProjectPageLayout({
  children,
  projectName,
  projectId,
  loading = true,
  paths,
  isScrolling = false,
}: IProjectPageLayout) {
  return (
    <>
      <ProjectNavigation />
      <ProjectPageLayoutContainer>
        <HeaderProject
          projectId={projectId}
          projectName={projectName}
          loading={loading}
          paths={paths}
        />
        <ProjectContainer isScrolling={isScrolling}>
          {children}
        </ProjectContainer>
      </ProjectPageLayoutContainer>
    </>
  )
}
