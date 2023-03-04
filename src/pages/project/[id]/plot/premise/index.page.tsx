import { IUpdatePlotDTO } from '@api/dtos/IUpdatePlotDTO'
import { EditorAndComments } from '@components/ProjectsComponents/EditorAndComments'

import { Toast } from '@components/usefull/Toast'
import { ProjectsContext } from '@contexts/projects'
import { usePreventBack } from '@hooks/usePreventDefaultBack'
import { useProject } from '@hooks/useProject'
import { ProjectPageLayout } from '@layouts/ProjectPageLayout'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'

export default function PremisePage() {
  const [successToastOpen, setSuccessToastOpen] = useState(false)
  const [premise, setPremise] = useState('')
  const [message, setMessage] = useState('')

  const { loading, updatePlot, error, setError } = useContext(ProjectsContext)

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
    setSuccessToastOpen(true)
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
        isScrolling
      >
        <Toast
          title="Premissa atualizada"
          message={message}
          open={successToastOpen}
          setOpen={setSuccessToastOpen}
          type="success"
        />

        <Toast
          title={error?.title!}
          message={error?.message!}
          open={!!error}
          setOpen={() => setError(undefined)}
        />

        <EditorAndComments
          updateValue={handleUpdatePremise}
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
