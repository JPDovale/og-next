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

export default function StorytellerPage() {
  const [storyteller, setStoryteller] = useState('')
  const [message, setMessage] = useState('')

  const { projects, loading, updatePlot } = useContext(ProjectsContext)
  const { user } = useContext(UserContext)

  const router = useRouter()
  const { id } = router.query
  usePreventBack(`/project/${id}/plot`)

  const project = projects.find(
    (project) => project.id === id,
  ) as IProjectResponse

  const commentsStoryteller = project?.plot?.comments?.filter(
    (comment) => comment.to === 'storyteller',
  )

  const userInProject = project?.users.find((u) => u.id === user?.id)

  async function handleUpdateStoryteller() {
    setMessage('')

    if (storyteller === project.plot.storyteller) return

    const updatedPlotStoryteller: IUpdatePlotDTO = {
      storyteller,
    }

    await updatePlot(updatedPlotStoryteller, project.id as string)

    setMessage('Narrador Alterado com sucesso')
  }

  return (
    <>
      <NextSeo
        title={`${project?.name || 'Carregando...'}-Narrador | Ognare`}
        noindex
      />
      <ProjectPageLayout
        projectName={project?.name}
        projectId={`${id}`}
        paths={['plot', 'Narrador']}
        loading={loading}
        inError={!loading && !project}
      >
        <EditorAndComments
          message={message}
          label="Narrador"
          updateValue={handleUpdateStoryteller}
          value={storyteller}
          preValue={project?.plot?.storyteller}
          permission={userInProject?.permission}
          comments={commentsStoryteller}
          projectCreatedPerUser={project?.createdPerUser}
          projectId={project?.id as string}
          setValue={setStoryteller}
          to="storyteller"
        />
      </ProjectPageLayout>
    </>
  )
}
