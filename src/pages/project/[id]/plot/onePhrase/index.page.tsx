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

export default function OnePhrasePage() {
  const [successToastOpen, setSuccessToastOpen] = useState(false)

  const [onePhrase, setOnePhrase] = useState('')
  const [message, setMessage] = useState('')

  const { loading, updatePlot, error, setError } = useContext(ProjectsContext)

  const router = useRouter()
  const { id } = router.query
  usePreventBack(`/project/${id}/plot`)

  const { project, projectName, permission } = useProject(id as string)
  const commentsOnePhrase = project?.plot.comments?.filter(
    (comment) => comment.to === 'onePhrase',
  )

  async function handleUpdateOnePhrase() {
    setMessage('')
    if (onePhrase === project?.plot.onePhrase) return
    const updatedPlotOnePhrase: IUpdatePlotDTO = {
      onePhrase,
    }

    await updatePlot(updatedPlotOnePhrase, project.id as string)
    setMessage('Ideia central atualizada com sucesso.')
    setSuccessToastOpen(true)
  }

  return (
    <>
      <NextSeo title={`${projectName}-Ideia central | Ognare`} noindex />

      <ProjectPageLayout
        projectName={projectName}
        projectId={`${id}`}
        paths={['Plot', 'Ideia central']}
        loading={loading}
        inError={!loading && !project}
        isScrolling
      >
        <Toast
          title="Ideia central atualizada"
          message={message}
          open={successToastOpen}
          setOpen={setSuccessToastOpen}
          type="success"
        />

        <ToastError error={error} setError={setError} />

        <EditorAndComments
          updateValue={handleUpdateOnePhrase}
          preValue={project?.plot?.onePhrase}
          permission={permission}
          comments={commentsOnePhrase}
          projectCreatedPerUser={project?.createdPerUser}
          projectId={project?.id as string}
          setValue={setOnePhrase}
          to="onePhrase"
        />
      </ProjectPageLayout>
    </>
  )
}
