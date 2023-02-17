import { IUpdatePlotDTO } from '@api/dtos/IUpdatePlotDTO'
import { EditorAndComments } from '@components/ProjectsComponents/EditorAndComments'
import { ProjectsContext } from '@contexts/projects'
import { usePreventBack } from '@hooks/usePreventDefaultBack'
import { useProject } from '@hooks/useProject'
import { ProjectPageLayout } from '@layouts/ProjectPageLayout'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'

export default function DetailsPage() {
  const [details, setDetails] = useState('')
  const [message, setMessage] = useState('')

  const { loading, updatePlot } = useContext(ProjectsContext)

  const router = useRouter()
  const { id } = router.query
  usePreventBack(`/project/${id}/plot`)

  const { project, projectName, permission } = useProject(id as string)
  const commentsDetails = project?.plot.comments?.filter(
    (comment) => comment.to === 'details',
  )

  async function handleUpdateDetails() {
    setMessage('')
    if (details === project?.plot.details) return
    const updatedPlotDetails: IUpdatePlotDTO = {
      details,
    }

    await updatePlot(updatedPlotDetails, project.id as string)
    setMessage('Detalhes atualizado com sucesso.')
  }

  return (
    <>
      <NextSeo title={`${projectName}-Detalhes | Ognare`} noindex />
      <ProjectPageLayout
        projectName={projectName}
        projectId={`${id}`}
        paths={['Plot', 'Detalhes']}
        loading={loading}
        inError={!loading && !project}
      >
        <EditorAndComments
          message={message}
          label="Detalhes"
          updateValue={handleUpdateDetails}
          value={details}
          preValue={project?.plot.details}
          permission={permission}
          comments={commentsDetails}
          projectCreatedPerUser={project?.createdPerUser}
          projectId={project?.id as string}
          setValue={setDetails}
          to="details"
        />
      </ProjectPageLayout>
    </>
  )
}
