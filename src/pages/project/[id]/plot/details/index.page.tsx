import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { IUpdatePlotDTO } from '../../../../../api/dtos/IUpdatePlotDTO'
import { IProjectResponse } from '../../../../../api/responsesTypes/IProjcetResponse'
import { EditorAndComments } from '../../../../../components/EditorAndComments'
import { ProjectsContext } from '../../../../../contexts/projects'
import { UserContext } from '../../../../../contexts/user'
import { ProjectPageLayout } from '../../../../../layouts/ProjectPageLayout'

export default function DetailsPage() {
  const [details, setDetails] = useState('')
  const [message, setMessage] = useState('')

  const { projects, loading, updatePlot } = useContext(ProjectsContext)
  const { user } = useContext(UserContext)

  const router = useRouter()
  const { id } = router.query

  const project = projects.find(
    (project) => project.id === id,
  ) as IProjectResponse

  const commentsDetails = project?.plot.comments?.filter(
    (comment) => comment.to === 'details',
  )

  const userInProject = project?.users.find((u) => u.id === user?.id)

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
    <ProjectPageLayout
      projectName={project?.name}
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
        permission={userInProject?.permission}
        comments={commentsDetails}
        projectCreatedPerUser={project?.createdPerUser}
        projectId={project?.id as string}
        setValue={setDetails}
        to="details"
      />
    </ProjectPageLayout>
  )
}
