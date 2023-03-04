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

export default function CountTimePage() {
  const [successToastOpen, setSuccessToastOpen] = useState(false)
  const [countTime, setCountTime] = useState('')
  const [message, setMessage] = useState('')

  const { loading, updatePlot, error, setError } = useContext(ProjectsContext)

  const router = useRouter()
  const { id } = router.query
  usePreventBack(`/project/${id}/plot`)

  const { project, projectName, permission } = useProject(id as string)
  const commentsCountTime = project?.plot.comments?.filter(
    (comment) => comment.to === 'countTime',
  )

  async function handleUpdateCountTime() {
    setMessage('')
    if (countTime === project?.plot.countTime) return
    const updatedPlotCountTime: IUpdatePlotDTO = {
      countTime,
    }

    await updatePlot(updatedPlotCountTime, project.id as string)

    setMessage('Tempo em que se passa atualizado com sucesso.')
    setSuccessToastOpen(true)
  }

  return (
    <>
      <NextSeo
        title={`${projectName}-Tempo em que se passa | Ognare`}
        noindex
      />
      <ProjectPageLayout
        projectName={projectName}
        projectId={`${id}`}
        paths={['Plot', 'Tempo em que se passa']}
        loading={loading}
        inError={!loading && !project}
        isScrolling
      >
        <Toast
          title="Tempo em que se passa atualizado"
          message={message}
          open={successToastOpen}
          setOpen={setSuccessToastOpen}
          type="success"
        />

        <ToastError error={error} setError={setError} />

        <EditorAndComments
          updateValue={handleUpdateCountTime}
          preValue={project?.plot.countTime}
          permission={permission}
          comments={commentsCountTime}
          projectCreatedPerUser={project?.createdPerUser}
          projectId={project?.id as string}
          setValue={setCountTime}
          to="countTime"
        />
      </ProjectPageLayout>
    </>
  )
}
