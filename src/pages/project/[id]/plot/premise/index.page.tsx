import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { IUpdatePlotDTO } from '../../../../../api/dtos/IUpdatePlotDTO'
import { IProjectResponse } from '../../../../../api/responsesTypes/IProjcetResponse'
import { EditorAndComments } from '../../../../../components/EditorAndComments'
import { Error } from '../../../../../components/Error'
import { Loading } from '../../../../../components/Loading'
import { ProjectsContext } from '../../../../../contexts/projects'
import { UserContext } from '../../../../../contexts/user'
import { ProjectPageLayout } from '../../../../../layouts/ProjectPageLayout'

export default function PremisePage() {
  const [premise, setPremise] = useState('')
  const [message, setMessage] = useState('')

  const { projects, loading, updatePlot } = useContext(ProjectsContext)
  const { user } = useContext(UserContext)

  const router = useRouter()
  const { id } = router.query

  if (loading) return <Loading />
  if (!projects) return <Error />

  const project = projects.find(
    (project) => project.id === id,
  ) as IProjectResponse

  if (!project || !user) return <Error />

  const commentsPremise = project.plot.comments?.filter(
    (comment) => comment.to === 'premise',
  )

  const userInProject = project.users.find((u) => u.id === user.id)

  async function handleUpdatePremise() {
    setMessage('')

    if (premise === project.plot.premise) return

    const updatedPlotPremise: IUpdatePlotDTO = {
      premise,
    }

    await updatePlot(updatedPlotPremise, project.id as string)

    setMessage('Premissa Alterada com sucesso')
  }

  return (
    <ProjectPageLayout
      projectName={project.name}
      projectId={`${id}`}
      paths={['plot', 'Premissa']}
      loading={loading}
    >
      {loading ? (
        <Loading />
      ) : (
        <EditorAndComments
          message={message}
          label="Premissa"
          updateValue={handleUpdatePremise}
          value={premise}
          preValue={project.plot.premise}
          permission={userInProject?.permission}
          comments={commentsPremise}
          projectCreatedPerUser={project.createdPerUser}
          projectId={project.id as string}
          setValue={setPremise}
          to="premise"
        />
      )}
    </ProjectPageLayout>
  )
}
