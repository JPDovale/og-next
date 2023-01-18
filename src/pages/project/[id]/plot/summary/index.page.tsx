import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { IUpdatePlotDTO } from '../../../../../api/dtos/IUpdatePlotDTO'
import { IProjectResponse } from '../../../../../api/responsesTypes/IProjcetResponse'
import { EditorAndComments } from '../../../../../components/EditorAndComments'
import { ProjectsContext } from '../../../../../contexts/projects'
import { UserContext } from '../../../../../contexts/user'
import { ProjectPageLayout } from '../../../../../layouts/ProjectPageLayout'

export default function SummaryPage() {
  const [summary, setSummary] = useState('')
  const [message, setMessage] = useState('')

  const { projects, loading, updatePlot } = useContext(ProjectsContext)
  const { user } = useContext(UserContext)

  const router = useRouter()
  const { id } = router.query

  const project = projects.find(
    (project) => project.id === id,
  ) as IProjectResponse

  const commentsSummary = project?.plot.comments?.filter(
    (comment) => comment.to === 'summary',
  )

  const userInProject = project?.users.find((u) => u.id === user?.id)

  async function handleUpdateSummary() {
    setMessage('')

    if (summary === project?.plot.summary) return

    const updatedPlotSummary: IUpdatePlotDTO = {
      summary,
    }

    await updatePlot(updatedPlotSummary, project.id as string)

    setMessage('Resumo atualizado com sucesso.')
  }

  return (
    <ProjectPageLayout
      projectName={project?.name}
      projectId={`${id}`}
      paths={['Plot', 'Resumo']}
      loading={loading}
      inError={!loading && !project}
    >
      <EditorAndComments
        message={message}
        label="Resumo"
        updateValue={handleUpdateSummary}
        value={summary}
        preValue={project?.plot.summary}
        permission={userInProject?.permission}
        comments={commentsSummary}
        projectCreatedPerUser={project?.createdPerUser}
        projectId={project?.id as string}
        setValue={setSummary}
        to="summary"
      />
    </ProjectPageLayout>
  )
}
