import { IUpdatePlotDTO } from '@api/dtos/IUpdatePlotDTO'
import { EditorAndComments } from '@components/ProjectsComponents/EditorAndComments'
import { ProjectsContext } from '@contexts/projects'
import { usePreventBack } from '@hooks/usePreventDefaultBack'
import { useProject } from '@hooks/useProject'
import { ProjectPageLayout } from '@layouts/ProjectPageLayout'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'

export default function PremisePage() {
  const [premise, setPremise] = useState('')
  const [message, setMessage] = useState('')

  const { loading, updatePlot } = useContext(ProjectsContext)

  const router = useRouter()
  const { id } = router.query
  usePreventBack(`/project/${id}/plot`)

  const { project, projectName, permission } = useProject(id as string)
  const commentsPremise = project?.plot?.comments?.filter(
    (comment) => comment.to === 'premise',
  )

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
      <NextSeo title={`${projectName}-Premissa | Ognare`} noindex />

      <ProjectPageLayout
        projectName={projectName}
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
          permission={permission}
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
