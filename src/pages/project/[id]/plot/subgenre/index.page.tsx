import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { IUpdatePlotDTO } from '../../../../../api/dtos/IUpdatePlotDTO'
import { IProjectResponse } from '../../../../../api/responsesTypes/IProjcetResponse'
import { EditorAndComments } from '../../../../../components/EditorAndComments'
import { Loading } from '../../../../../components/Loading'
import { ProjectsContext } from '../../../../../contexts/projects'
import { UserContext } from '../../../../../contexts/user'
import { ProjectPageLayout } from '../../../../../layouts/ProjectPageLayout'

export default function SubgenrePage() {
  const [subgenre, setSubgenre] = useState('')
  const [message, setMessage] = useState('')

  const { projects, loading, updatePlot } = useContext(ProjectsContext)
  const { user } = useContext(UserContext)

  const router = useRouter()
  const { id } = router.query

  const project = projects.find(
    (project) => project.id === id,
  ) as IProjectResponse

  const commentsSubgenre = project?.plot.comments?.filter(
    (comment) => comment.to === 'subgenre',
  )

  const userInProject = project?.users.find((u) => u.id === user?.id)

  async function handleUpdateSubgenre() {
    setMessage('')

    if (subgenre === project?.plot.subgenre) return

    const updatedPlotSubgenre: IUpdatePlotDTO = {
      subgenre,
    }

    await updatePlot(updatedPlotSubgenre, project.id as string)

    setMessage('Subgênero atualizado com sucesso.')
  }

  return (
    <ProjectPageLayout
      projectName={project?.name}
      projectId={`${id}`}
      paths={['Plot', 'Subgênero']}
      loading={loading}
    >
      {loading ? (
        <Loading />
      ) : (
        <EditorAndComments
          message={message}
          label="Subgênero"
          updateValue={handleUpdateSubgenre}
          value={subgenre}
          preValue={project.plot.subgenre}
          permission={userInProject?.permission}
          comments={commentsSubgenre}
          projectCreatedPerUser={project.createdPerUser}
          projectId={project.id as string}
          setValue={setSubgenre}
          to="subgenre"
        />
      )}
    </ProjectPageLayout>
  )
}
