import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { IUpdatePlotDTO } from '../../../../../api/dtos/IUpdatePlotDTO'
import { IProjectResponse } from '../../../../../api/responsesTypes/IProjcetResponse'
import { EditorAndComments } from '../../../../../components/EditorAndComments'
import { ProjectsContext } from '../../../../../contexts/projects'
import { UserContext } from '../../../../../contexts/user'
import { ProjectPageLayout } from '../../../../../layouts/ProjectPageLayout'

export default function LiteraryGenerePage() {
  const [literaryGenere, setLiteraryGenere] = useState('')
  const [message, setMessage] = useState('')

  const { projects, loading, updatePlot } = useContext(ProjectsContext)
  const { user } = useContext(UserContext)

  const router = useRouter()
  const { id } = router.query

  const project = projects.find(
    (project) => project.id === id,
  ) as IProjectResponse

  const commentsLiteraryGenere = project?.plot.comments?.filter(
    (comment) => comment.to === 'literaryGenere',
  )

  const userInProject = project?.users.find((u) => u.id === user?.id)

  async function handleUpdateLiteraryGenere() {
    setMessage('')

    if (literaryGenere === project?.plot.literaryGenere) return

    const updatedPlotLiteraryGenere: IUpdatePlotDTO = {
      literaryGenere,
    }

    await updatePlot(updatedPlotLiteraryGenere, project.id as string)

    setMessage('Gênero literário atualizado com sucesso.')
  }

  return (
    <ProjectPageLayout
      projectName={project?.name}
      projectId={`${id}`}
      paths={['Plot', 'Gênero literário']}
      loading={loading}
      inError={!loading && !project}
    >
      <EditorAndComments
        message={message}
        label="Gênero literário"
        updateValue={handleUpdateLiteraryGenere}
        value={literaryGenere}
        preValue={project?.plot.literaryGenere}
        permission={userInProject?.permission}
        comments={commentsLiteraryGenere}
        projectCreatedPerUser={project?.createdPerUser}
        projectId={project?.id as string}
        setValue={setLiteraryGenere}
        to="literaryGenere"
      />
    </ProjectPageLayout>
  )
}
