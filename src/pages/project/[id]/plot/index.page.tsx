import { useRouter } from 'next/router'
import { useContext } from 'react'
import { IProjectResponse } from '../../../../api/responsesTypes/IProjcetResponse'
import { PlotParts } from '../../../../components/PlotParts'
import { ProjectsContext } from '../../../../contexts/projects'
import { ProjectPageLayout } from '../../../../layouts/ProjectPageLayout'

export default function PlotPage() {
  const { projects, loading } = useContext(ProjectsContext)

  const router = useRouter()
  const { id } = router.query

  const project = projects.find(
    (project) => project.id === id,
  ) as IProjectResponse

  return (
    <ProjectPageLayout
      projectName={project?.name}
      projectId={`${id}`}
      paths={['Plot']}
      loading={loading}
      isScrolling
    >
      {!loading && <PlotParts project={project} />}
    </ProjectPageLayout>
  )
}
