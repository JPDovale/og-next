import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { IUpdatePlotDTO } from '../../../../../api/dtos/IUpdatePlotDTO'
import { IProjectResponse } from '../../../../../api/responsesTypes/IProjcetResponse'
import { EditorAndComments } from '../../../../../components/EditorAndComments'
import { ProjectsContext } from '../../../../../contexts/projects'
import { UserContext } from '../../../../../contexts/user'
import { ProjectPageLayout } from '../../../../../layouts/ProjectPageLayout'

export default function HistoricalFactPage() {
  const [historicalFact, setHistoricalFact] = useState('')
  const [message, setMessage] = useState('')

  const { projects, loading, updatePlot } = useContext(ProjectsContext)
  const { user } = useContext(UserContext)

  const router = useRouter()
  const { id } = router.query

  const project = projects.find(
    (project) => project.id === id,
  ) as IProjectResponse

  const commentsHistoricalFact = project?.plot.comments?.filter(
    (comment) => comment.to === 'historicalFact',
  )

  const userInProject = project?.users.find((u) => u.id === user?.id)

  async function handleUpdateHistoricalFact() {
    setMessage('')

    if (historicalFact === project?.plot.historicalFact) return

    const updatedPlotHistoricalFact: IUpdatePlotDTO = {
      historicalFact,
    }

    await updatePlot(updatedPlotHistoricalFact, project.id as string)

    setMessage('Fato histórico atualizado com sucesso.')
  }

  return (
    <>
      <NextSeo
        title={`${project?.name || 'Carregando...'}-Fato histórico | Ognare`}
        noindex
      />
      <ProjectPageLayout
        projectName={project?.name}
        projectId={`${id}`}
        paths={['Plot', 'Fato histórico']}
        loading={loading}
        inError={!loading && !project}
      >
        <EditorAndComments
          message={message}
          label="Fato histórico"
          updateValue={handleUpdateHistoricalFact}
          value={historicalFact}
          preValue={project?.plot.historicalFact}
          permission={userInProject?.permission}
          comments={commentsHistoricalFact}
          projectCreatedPerUser={project?.createdPerUser}
          projectId={project?.id as string}
          setValue={setHistoricalFact}
          to="historicalFact"
        />
      </ProjectPageLayout>
    </>
  )
}
