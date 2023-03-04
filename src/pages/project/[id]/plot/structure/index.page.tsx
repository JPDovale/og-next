import { IUpdatePlotDTO } from '@api/dtos/IUpdatePlotDTO'
import { EditorAndComments } from '@components/ProjectsComponents/EditorAndComments'
import { Toast } from '@components/usefull/Toast'
import { ToastError } from '@components/usefull/ToastError'
import { ProjectsContext } from '@contexts/projects'
import { usePreventBack } from '@hooks/usePreventDefaultBack'
import { useProject } from '@hooks/useProject'
import { ProjectPageLayout } from '@layouts/ProjectPageLayout'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'

export default function StructurePage() {
  const [successToastOpen, setSuccessToastOpen] = useState(false)
  const [act1, setAct1] = useState('')
  const [act2, setAct2] = useState('')
  const [act3, setAct3] = useState('')
  const [message, setMessage] = useState('')

  const { loading, updatePlot, error, setError } = useContext(ProjectsContext)

  const router = useRouter()
  const { id } = router.query
  usePreventBack(`/project/${id}/plot`)

  const { project, projectName, permission } = useProject(id as string)
  const commentsStructure = project?.plot.comments?.filter(
    (comment) => comment.to === 'structure',
  )

  async function handleUpdateAct1() {
    setSuccessToastOpen(false)
    setMessage('')
    if (act1 === project.plot.structure?.act1) return

    const updatedPlotStructure: IUpdatePlotDTO = {
      structure: {
        act1,
        act2: project.plot.structure?.act2,
        act3: project.plot.structure?.act3,
      },
    }

    await updatePlot(updatedPlotStructure, project.id as string)
    setMessage('Estrutura -> Ato 1 atualizada com sucesso.')
    setSuccessToastOpen(true)
  }

  async function handleUpdateAct2() {
    setSuccessToastOpen(false)
    setMessage('')
    if (act2 === project.plot.structure?.act2) return

    const updatedPlotStructure: IUpdatePlotDTO = {
      structure: {
        act1: project.plot.structure?.act1,
        act2,
        act3: project.plot.structure?.act3,
      },
    }

    await updatePlot(updatedPlotStructure, project.id as string)
    setMessage('Estrutura -> Ato 2 atualizada com sucesso.')
    setSuccessToastOpen(true)
  }

  async function handleUpdateAct3() {
    setSuccessToastOpen(false)
    setMessage('')
    if (act3 === project.plot.structure?.act3) return

    const updatedPlotStructure: IUpdatePlotDTO = {
      structure: {
        act1: project.plot.structure?.act1,
        act2: project.plot.structure?.act2,
        act3,
      },
    }

    await updatePlot(updatedPlotStructure, project.id as string)
    setMessage('Estrutura -> Ato 3 atualizada com sucesso.')
    setSuccessToastOpen(true)
  }

  return (
    <>
      <NextSeo title={`${projectName}-Estrutura de 3 atos | Ognare`} noindex />

      <ProjectPageLayout
        projectName={projectName}
        projectId={`${id}`}
        paths={['Plot', 'Estrutura']}
        loading={loading}
        inError={!loading && !project}
        isScrolling
      >
        <Toast
          title="Estrutura de três atos atualizada"
          message={message}
          open={successToastOpen}
          setOpen={setSuccessToastOpen}
          type="success"
        />

        <ToastError error={error} setError={setError} />

        <EditorAndComments
          updateValue={handleUpdateAct1}
          preValue={project?.plot.structure?.act1}
          permission={permission}
          comments={commentsStructure}
          projectCreatedPerUser={project?.createdPerUser}
          projectId={project?.id as string}
          setValue={setAct1}
          to="structure"
          superFix="Ato 1"
          withoutComments
        />

        <EditorAndComments
          updateValue={handleUpdateAct2}
          preValue={project?.plot.structure?.act2}
          permission={permission}
          comments={commentsStructure}
          projectCreatedPerUser={project?.createdPerUser}
          projectId={project?.id as string}
          setValue={setAct2}
          to="structure"
          superFix="Ato 2"
          withoutComments
        />

        <EditorAndComments
          updateValue={handleUpdateAct3}
          preValue={project?.plot.structure?.act3}
          permission={permission}
          comments={commentsStructure}
          projectCreatedPerUser={project?.createdPerUser}
          projectId={project?.id as string}
          setValue={setAct3}
          to="structure"
          superFix="Ato 3"
        />
      </ProjectPageLayout>
    </>
  )
}
