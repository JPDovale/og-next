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

export default function StorytellerPage() {
  const [successToastOpen, setSuccessToastOpen] = useState(false)
  const [storyteller, setStoryteller] = useState('')
  const [message, setMessage] = useState('')

  const { loading, updatePlot, error, setError } = useContext(ProjectsContext)

  const router = useRouter()
  const { id } = router.query
  usePreventBack(`/project/${id}/plot`)

  const { project, projectName, permission } = useProject(id as string)
  const commentsStoryteller = project?.plot?.comments?.filter(
    (comment) => comment.to === 'storyteller',
  )

  async function handleUpdateStoryteller() {
    setMessage('')
    if (storyteller === project.plot.storyteller) return
    const updatedPlotStoryteller: IUpdatePlotDTO = {
      storyteller,
    }

    await updatePlot(updatedPlotStoryteller, project.id as string)
    setMessage('Narrador Alterado com sucesso')
    setSuccessToastOpen(true)
  }

  return (
    <>
      <NextSeo title={`${projectName}-Narrador | Ognare`} noindex />

      <ProjectPageLayout
        projectName={projectName}
        projectId={`${id}`}
        paths={['plot', 'Narrador']}
        loading={loading}
        inError={!loading && !project}
        isScrolling
      >
        <Toast
          title="Narrador atualizado"
          message={message}
          open={successToastOpen}
          setOpen={setSuccessToastOpen}
          type="success"
        />

        <ToastError error={error} setError={setError} />

        <EditorAndComments
          updateValue={handleUpdateStoryteller}
          preValue={project?.plot?.storyteller}
          permission={permission}
          comments={commentsStoryteller}
          projectCreatedPerUser={project?.createdPerUser}
          projectId={project?.id as string}
          setValue={setStoryteller}
          to="storyteller"
        />
      </ProjectPageLayout>
    </>
  )
}
