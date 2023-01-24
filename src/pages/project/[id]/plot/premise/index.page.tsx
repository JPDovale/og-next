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

export default function PremisePage() {
  const [premise, setPremise] = useState('')
  const [message, setMessage] = useState('')

  const { projects, loading, updatePlot } = useContext(ProjectsContext)
  const { user } = useContext(UserContext)

  const router = useRouter()
  const { id } = router.query
  usePreventBack(`/project/${id}/plot`)

  const project = projects.find(
    (project) => project.id === id,
  ) as IProjectResponse

  const commentsPremise = project?.plot?.comments?.filter(
    (comment) => comment.to === 'premise',
  )

  const userInProject = project?.users.find((u) => u.id === user?.id)

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
    <>
      <NextSeo
        title={`${project?.name || 'Carregando...'}-Premissa | Ognare`}
        noindex
      />
      <ProjectPageLayout
        projectName={project?.name}
        projectId={`${id}`}
        paths={['plot', 'Premissa']}
        loading={loading}
        inError={!loading && !project}
      >
        <EditorAndComments
          message={message}
          label="Premissa"
          updateValue={handleUpdatePremise}
          value={premise}
          preValue={project?.plot?.premise}
          permission={userInProject?.permission}
          comments={commentsPremise}
          projectCreatedPerUser={project?.createdPerUser}
          projectId={project?.id as string}
          setValue={setPremise}
          to="premise"
        />
      </ProjectPageLayout>
    </>
  )
}
