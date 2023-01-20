import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { IProjectResponse } from '../../../../api/responsesTypes/IProjcetResponse'
import { Loading } from '../../../../components/Loading'
import { MindMap } from '../../../../components/MindMap'
import { ProjectsContext } from '../../../../contexts/projects'
import { ProjectPageLayout } from '../../../../layouts/ProjectPageLayout'
import { MindMapPageContainer } from './styles'

export default function MindMapPage() {
  const { projects, loading } = useContext(ProjectsContext)

  const router = useRouter()
  const { id } = router.query

  const project = projects.find(
    (project) => project.id === id,
  ) as IProjectResponse

  return (
    <>
      <NextSeo
        title={`${project?.name || 'Carregando...'}-Mind map view | Ognare`}
        noindex
      />

      <ProjectPageLayout
        projectName={project?.name}
        projectId={`${id}`}
        paths={['Mind map view']}
        loading={loading}
        inError={!loading && !project}
        isFullScreen
      >
        <MindMapPageContainer>
          {loading ? <Loading /> : <MindMap project={project} />}
        </MindMapPageContainer>
      </ProjectPageLayout>
    </>
  )
}
