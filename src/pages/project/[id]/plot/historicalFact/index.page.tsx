import { IUpdatePlotDTO } from '@api/dtos/IUpdatePlotDTO'
import { EditorAndComments } from '@components/ProjectsComponents/EditorAndComments'
import { Toast } from '@components/usefull/Toast'
import { ToastError } from '@components/usefull/ToastError'
import { ProjectsContext } from '@contexts/projects'
import { usePreventBack } from '@hooks/usePreventDefaultBack'
import { useProject } from '@hooks/useProject'
import { ProjectPageLayout } from '@layouts/ProjectPageLayout'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'

export default function HistoricalFactPage() {
  const [successToastOpen, setSuccessToastOpen] = useState(false)
  const [historicalFact, setHistoricalFact] = useState('')
  const [message, setMessage] = useState('')

  const { loading, updatePlot, error, setError } = useContext(ProjectsContext)

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
    setSuccessToastOpen(true)
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
        isScrolling
      >
        <Toast
          title="Fato histórico atualizado"
          message={message}
          open={successToastOpen}
          setOpen={setSuccessToastOpen}
          type="success"
        />

        <ToastError error={error} setError={setError} />

        <EditorAndComments
          updateValue={handleUpdateHistoricalFact}
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
