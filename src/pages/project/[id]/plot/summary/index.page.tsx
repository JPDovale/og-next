import { IUpdatePlotDTO } from '@api/dtos/IUpdatePlotDTO'
import { EditorAndComments } from '@components/ProjectsComponents/EditorAndComments'
import { ProjectsContext } from '@contexts/projects'
import { usePreventBack } from '@hooks/usePreventDefaultBack'
import { useProject } from '@hooks/useProject'
import { ProjectPageLayout } from '@layouts/ProjectPageLayout'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'

export default function SummaryPage() {
  const [summary, setSummary] = useState('')
  const [message, setMessage] = useState('')

  const { loading, updatePlot } = useContext(ProjectsContext)

  const router = useRouter()
  const { id } = router.query
  usePreventBack(`/project/${id}/plot`)

  const { project, projectName, permission } = useProject(id as string)
  const commentsSummary = project?.plot.comments?.filter(
    (comment) => comment.to === 'summary',
  )

  async function handleUpdateSummary() {
    setMessage('')
    if (summary === project?.plot.summary) return
    const updatedPlotSummary: IUpdatePlotDTO = {
      summary,
    }

    await updatePlot(updatedPlotSummary, project.id as string)
    setMessage('Resumo atualizado com sucesso.')
  }

  return (
    <>
      <NextSeo title={`${projectName}-Resumo | Ognare`} noindex />

      <ProjectPageLayout
        projectName={projectName}
        projectId={`${id}`}
        paths={['Plot', 'Resumo']}
        loading={loading}
        inError={!loading && !project}
      >
        <EditorAndComments
          message={message}
          label="Resumo"
          updateValue={handleUpdateSummary}
          value={summary}
          preValue={project?.plot.summary}
          permission={permission}
          comments={commentsSummary}
          projectCreatedPerUser={project?.createdPerUser}
          projectId={project?.id as string}
          setValue={setSummary}
          to="summary"
        />
      </ProjectPageLayout>
    </>
  )
}
