import { IUpdatePlotDTO } from '@api/dtos/IUpdatePlotDTO'
import { EditorAndComments } from '@components/ProjectsComponents/EditorAndComments'
import { ProjectsContext } from '@contexts/projects'
import { usePreventBack } from '@hooks/usePreventDefaultBack'
import { useProject } from '@hooks/useProject'
import { ProjectPageLayout } from '@layouts/ProjectPageLayout'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'

export default function CountTimePage() {
  const [countTime, setCountTime] = useState('')
  const [message, setMessage] = useState('')

  const { loading, updatePlot } = useContext(ProjectsContext)

  const router = useRouter()
  const { id } = router.query
  usePreventBack(`/project/${id}/plot`)

  const { project, projectName, permission } = useProject(id as string)
  const commentsCountTime = project?.plot.comments?.filter(
    (comment) => comment.to === 'countTime',
  )

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
        title={`${projectName}-Tempo em que se passa | Ognare`}
        noindex
      />
      <ProjectPageLayout
        projectName={projectName}
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
          permission={permission}
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
