import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { IUpdatePlotDTO } from '../../../../../api/dtos/IUpdatePlotDTO'
import { IProjectResponse } from '../../../../../api/responsesTypes/IProjcetResponse'
import { EditorAndComments } from '../../../../../components/EditorAndComments'
import { ProjectsContext } from '../../../../../contexts/projects'
import { UserContext } from '../../../../../contexts/user'
import { ProjectPageLayout } from '../../../../../layouts/ProjectPageLayout'

export default function AmbientPage() {
  const [ambient, setAmbient] = useState('')
  const [message, setMessage] = useState('')

  const { projects, loading, updatePlot } = useContext(ProjectsContext)
  const { user } = useContext(UserContext)

  const router = useRouter()
  const { id } = router.query

  const project = projects?.find(
    (project) => project.id === id,
  ) as IProjectResponse

  const commentsAmbient = project?.plot.comments?.filter(
    (comment) => comment.to === 'ambient',
  )

  const userInProject = project?.users.find((u) => u.id === user?.id)

  async function handleUpdateAmbient() {
    setMessage('')

    if (ambient === project?.plot.ambient) return

    const updatedPlotAmbient: IUpdatePlotDTO = {
      ambient,
    }

    await updatePlot(updatedPlotAmbient, project.id as string)

    setMessage('Ambientação atualizada com sucesso.')
  }

  return (
    <>
      <NextSeo
        title={`${project?.name || 'Carregando...'}-Ambientação | Ognare`}
        noindex
      />
      <ProjectPageLayout
        projectName={project?.name}
        projectId={`${id}`}
        paths={['Plot', 'Ambientação']}
        loading={loading}
        inError={!loading && !project}
      >
        <EditorAndComments
          message={message}
          label="Ambientação"
          updateValue={handleUpdateAmbient}
          value={ambient}
          preValue={project?.plot?.ambient}
          permission={userInProject?.permission}
          comments={commentsAmbient}
          projectCreatedPerUser={project?.createdPerUser}
          projectId={project?.id as string}
          setValue={setAmbient}
          to="ambient"
        />
      </ProjectPageLayout>
    </>
  )
}
