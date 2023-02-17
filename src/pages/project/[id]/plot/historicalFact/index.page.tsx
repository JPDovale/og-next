import { IUpdatePlotDTO } from '@api/dtos/IUpdatePlotDTO'
import { EditorAndComments } from '@components/ProjectsComponents/EditorAndComments'
import { ProjectsContext } from '@contexts/projects'
import { usePreventBack } from '@hooks/usePreventDefaultBack'
import { useProject } from '@hooks/useProject'
import { ProjectPageLayout } from '@layouts/ProjectPageLayout'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'

export default function HistoricalFactPage() {
  const [historicalFact, setHistoricalFact] = useState('')
  const [message, setMessage] = useState('')

  const { loading, updatePlot } = useContext(ProjectsContext)

  const router = useRouter()
  const { id } = router.query
  usePreventBack(`/project/${id}/plot`)

  const { project, projectName, permission } = useProject(id as string)
  const commentsHistoricalFact = project?.plot.comments?.filter(
    (comment) => comment.to === 'historicalFact',
  )

  async function handleUpdateHistoricalFact() {
    setMessage('')
    if (historicalFact === project?.plot.historicalFact) return
    const updatedPlotHistoricalFact: IUpdatePlotDTO = {
      historicalFact,
    }

    await updatePlot(updatedPlotHistoricalFact, project.id as string)
    setMessage('Fato histórico atualizado com sucesso.')
  }

  return (
    <>
      <NextSeo title={`${projectName}-Fato histórico | Ognare`} noindex />

      <ProjectPageLayout
        projectName={projectName}
        projectId={`${id}`}
        paths={['Plot', 'Fato histórico']}
        loading={loading}
        inError={!loading && !project}
      >
        <EditorAndComments
          message={message}
          label="Fato histórico"
          updateValue={handleUpdateHistoricalFact}
          value={historicalFact}
          preValue={project?.plot.historicalFact}
          permission={permission}
          comments={commentsHistoricalFact}
          projectCreatedPerUser={project?.createdPerUser}
          projectId={project?.id as string}
          setValue={setHistoricalFact}
          to="historicalFact"
        />
      </ProjectPageLayout>
    </>
  )
}
