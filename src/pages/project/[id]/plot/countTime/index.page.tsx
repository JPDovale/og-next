import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { IUpdatePlotDTO } from '../../../../../api/dtos/IUpdatePlotDTO'
import { IProjectResponse } from '../../../../../api/responsesTypes/IProjcetResponse'
import { EditorAndComments } from '../../../../../components/EditorAndComments'
import { ProjectsContext } from '../../../../../contexts/projects'
import { UserContext } from '../../../../../contexts/user'
import { usePreventBack } from '../../../../../hooks/usePreventDefaultBack'
import { ProjectPageLayout } from '../../../../../layouts/ProjectPageLayout'

export default function CountTimePage() {
  const [countTime, setCountTime] = useState('')
  const [message, setMessage] = useState('')

  const { projects, loading, updatePlot } = useContext(ProjectsContext)
  const { user } = useContext(UserContext)

  const router = useRouter()
  const { id } = router.query
  usePreventBack(`/project/${id}/plot`)

  const project = projects.find(
    (project) => project.id === id,
  ) as IProjectResponse

  const commentsCountTime = project?.plot.comments?.filter(
    (comment) => comment.to === 'countTime',
  )

  const userInProject = project?.users.find((u) => u.id === user?.id)

  async function handleUpdateCountTime() {
    setMessage('')

    if (countTime === project?.plot.countTime) return

    const updatedPlotCountTime: IUpdatePlotDTO = {
      countTime,
    }

    await updatePlot(updatedPlotCountTime, project.id as string)

    setMessage('Tempo em que se passa atualizado com sucesso.')
  }

  return (
    <>
      <NextSeo
        title={`${
          project?.name || 'Carregando...'
        }-Tempo em que se passa | Ognare`}
        noindex
      />
      <ProjectPageLayout
        projectName={project?.name}
        projectId={`${id}`}
        paths={['Plot', 'Tempo em que se passa']}
        loading={loading}
        inError={!loading && !project}
      >
        <EditorAndComments
          message={message}
          label="Tempo em que se passa"
          updateValue={handleUpdateCountTime}
          value={countTime}
          preValue={project?.plot.countTime}
          permission={userInProject?.permission}
          comments={commentsCountTime}
          projectCreatedPerUser={project?.createdPerUser}
          projectId={project?.id as string}
          setValue={setCountTime}
          to="countTime"
        />
      </ProjectPageLayout>
    </>
  )
}
