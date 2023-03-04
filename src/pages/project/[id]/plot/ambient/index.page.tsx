import { IUpdatePlotDTO } from '@api/dtos/IUpdatePlotDTO'
import { EditorAndComments } from '@components/ProjectsComponents/EditorAndComments'
import { Toast } from '@components/usefull/Toast'
import { ProjectsContext } from '@contexts/projects'
import { usePreventBack } from '@hooks/usePreventDefaultBack'
import { useProject } from '@hooks/useProject'
import { ProjectPageLayout } from '@layouts/ProjectPageLayout'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'

export default function AmbientPage() {
  const [successToastOpen, setSuccessToastOpen] = useState(false)
  const [ambient, setAmbient] = useState('')
  const [message, setMessage] = useState('')

  const { loading, updatePlot, error, setError } = useContext(ProjectsContext)

  const router = useRouter()
  const { id } = router.query
  usePreventBack(`/project/${id}/plot`)

  const { project, permission, projectName } = useProject(id as string)
  const commentsAmbient = project?.plot.comments?.filter(
    (comment) => comment.to === 'ambient',
  )

  async function handleUpdateAmbient() {
    setMessage('')
    if (ambient === project?.plot.ambient) return
    const updatedPlotAmbient: IUpdatePlotDTO = {
      ambient,
    }

    await updatePlot(updatedPlotAmbient, project.id as string)
    setMessage('Ambientação atualizada com sucesso.')
    setSuccessToastOpen(true)
  }

  return (
    <>
      <NextSeo title={`${projectName}-Ambientação | Ognare`} noindex />
      <ProjectPageLayout
        projectName={projectName}
        projectId={`${id}`}
        paths={['Plot', 'Ambientação']}
        loading={loading}
        inError={!loading && !project}
        isScrolling
      >
        <Toast
          title="Ambiente atualizado"
          message={message}
          open={successToastOpen}
          setOpen={setSuccessToastOpen}
          type="success"
        />

        <Toast
          title={error?.title!}
          message={error?.message!}
          open={!!error}
          setOpen={() => setError(undefined)}
        />

        <EditorAndComments
          updateValue={handleUpdateAmbient}
          preValue={project?.plot?.ambient}
          permission={permission}
          comments={commentsAmbient}
          projectCreatedPerUser={project?.createdPerUser}
          projectId={project?.id as string}
          setValue={setAmbient}
          to="ambient"
        />
      </ProjectPageLayout>
    </>
  )
}
