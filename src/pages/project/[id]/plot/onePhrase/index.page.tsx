import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { IUpdatePlotDTO } from '../../../../../api/dtos/IUpdatePlotDTO'
import { IProjectResponse } from '../../../../../api/responsesTypes/IProjcetResponse'
import { EditorAndComments } from '../../../../../components/EditorAndComments'
import { Loading } from '../../../../../components/Loading'
import { ProjectsContext } from '../../../../../contexts/projects'
import { UserContext } from '../../../../../contexts/user'
import { ProjectPageLayout } from '../../../../../layouts/ProjectPageLayout'

export default function OnePhrasePage() {
  const [onePhrase, setOnePhrase] = useState('')
  const [message, setMessage] = useState('')

  const { projects, loading, updatePlot } = useContext(ProjectsContext)
  const { user } = useContext(UserContext)

  const router = useRouter()
  const { id } = router.query

  const project = projects.find(
    (project) => project.id === id,
  ) as IProjectResponse

  const commentsOnePhrase = project?.plot.comments?.filter(
    (comment) => comment.to === 'onePhrase',
  )

  const userInProject = project?.users.find((u) => u.id === user?.id)

  async function handleUpdateOnePhrase() {
    setMessage('')

    if (onePhrase === project?.plot.onePhrase) return

    const updatedPlotOnePhrase: IUpdatePlotDTO = {
      onePhrase,
    }

    await updatePlot(updatedPlotOnePhrase, project.id as string)

    setMessage('Ideia central atualizada com sucesso.')
  }

  return (
    <ProjectPageLayout
      projectName={project?.name}
      projectId={`${id}`}
      paths={['Plot', 'Ideia central']}
      loading={loading}
    >
      {loading ? (
        <Loading />
      ) : (
        <EditorAndComments
          message={message}
          label="Ideia central"
          updateValue={handleUpdateOnePhrase}
          value={onePhrase}
          preValue={project.plot.onePhrase}
          permission={userInProject?.permission}
          comments={commentsOnePhrase}
          projectCreatedPerUser={project.createdPerUser}
          projectId={project.id as string}
          setValue={setOnePhrase}
          to="onePhrase"
        />
      )}
    </ProjectPageLayout>
  )
}
