import { IError } from '@@types/errors/IError'
import { IUpdatePlotDTO } from '@api/dtos/IUpdatePlotDTO'
import { Editor } from '@components/Editor'
import { CommentsOnPage } from '@components/ProjectsComponents/CommentsOnPage'
import { Toast } from '@components/usefull/Toast'
import { ToastError } from '@components/usefull/ToastError'
import { usePreventBack } from '@hooks/usePreventDefaultBack'
import { useProject } from '@hooks/useProject'
import { ProjectPageLayout } from '@layouts/ProjectPageLayout'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function StructurePage() {
  const [act1, setAct1] = useState('')
  const [act2, setAct2] = useState('')
  const [act3, setAct3] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [error, setError] = useState<IError | null>(null)

  const router = useRouter()
  const { id } = router.query
  usePreventBack(`/project/${id}/plot`)

  const { project, projectName, permission, loadingProject, callEvent } =
    useProject(id as string)

  const commentsStructure = project?.comments?.filter(
    (comment) => comment.to_unknown === 'structure',
  )

  async function handleUpdateAct1() {
    setSuccessMessage('')
    setError(null)
    if (act1 === project?.structure_act_1) return

    const updatedPlotStructure: IUpdatePlotDTO = {
      structure: {
        act1,
        act2: project?.structure_act_2,
        act3: project?.structure_act_3,
      },
    }

    const { resolved, error } = await callEvent.updatePlot(updatedPlotStructure)

    if (resolved) {
      setSuccessMessage('Ato 1 atualizado com sucesso.')
    }

    if (error) {
      setError(error)
    }
  }

  async function handleUpdateAct2() {
    setSuccessMessage('')
    setError(null)
    if (act2 === project?.structure_act_2) return

    const updatedPlotStructure: IUpdatePlotDTO = {
      structure: {
        act1: project?.structure_act_1,
        act2,
        act3: project?.structure_act_3,
      },
    }

    const { resolved, error } = await callEvent.updatePlot(updatedPlotStructure)

    if (resolved) {
      setSuccessMessage('Ato 2 atualizado com sucesso.')
    }

    if (error) {
      setError(error)
    }
  }

  async function handleUpdateAct3() {
    setSuccessMessage('')
    setError(null)
    if (act3 === project?.structure_act_3) return

    const updatedPlotStructure: IUpdatePlotDTO = {
      structure: {
        act1: project?.structure_act_1,
        act2: project?.structure_act_2,
        act3,
      },
    }

    const { resolved, error } = await callEvent.updatePlot(updatedPlotStructure)

    if (resolved) {
      setSuccessMessage('Ato 3 atualizado com sucesso.')
    }

    if (error) {
      setError(error)
    }
  }

  return (
    <>
      <NextSeo
        title={`${projectName}-Estrutura de 3 atos | Magiscrita`}
        noindex
      />

      <ProjectPageLayout
        projectName={projectName}
        projectId={`${id}`}
        paths={['Plot', 'Estrutura']}
        loading={loadingProject}
        inError={!loadingProject && !project}
        isScrolling
      >
        <Toast
          title="Estrutura de três atos atualizada"
          message={successMessage}
          open={!!successMessage}
          setOpen={() => setSuccessMessage('')}
        />

        <ToastError error={error} setError={setError} />

        <Editor
          handleUpdate={handleUpdateAct1}
          permission={permission}
          preValue={project?.structure_act_1 ?? ''}
          projectId={project!.id}
          setValue={setAct1}
          to="structure"
          superFix="Ato 1"
          description={
            <>
              Estrutura de Três Atos é um esquema comum usado na escrita de
              roteiros e narrativas. Cada ato tem sua própria função na história
              geral e trabalha em conjunto para desenvolver a trama e manter o
              público engajado. Aqui está uma breve descrição de cada ato:
              <br />
              <br />
              Primeiro Ato: O primeiro ato estabelece o cenário da história,
              apresenta os personagens principais e estabelece o conflito
              principal. É neste momento que o público se envolve na história e
              aprende o suficiente sobre os personagens e a trama para ficar
              interessado. O primeiro ato termina com um evento que coloca a
              história em movimento.
            </>
          }
        />

        <Editor
          handleUpdate={handleUpdateAct2}
          permission={permission}
          preValue={project?.structure_act_2 ?? ''}
          projectId={project!.id}
          setValue={setAct2}
          to="structure"
          superFix="Ato 2"
          description={
            <>
              Segundo Ato: O segundo ato é a parte mais longa e complexa da
              estrutura de três atos. É nesta parte que a história se
              desenvolve, os personagens enfrentam obstáculos e se esforçam para
              superá-los. O protagonista geralmente enfrenta um ponto baixo, uma
              derrota ou um desafio aparentemente impossível de superar. O
              segundo ato termina com um evento dramático que prepara o palco
              para o clímax.
            </>
          }
        />

        <Editor
          handleUpdate={handleUpdateAct3}
          permission={permission}
          preValue={project?.structure_act_3 ?? ''}
          projectId={project!.id}
          setValue={setAct3}
          to="structure"
          superFix="Ato 3"
          description={
            <>
              Terceiro Ato: O terceiro ato é a conclusão da história. É nesta
              parte que a tensão aumenta e os personagens enfrentam o clímax. O
              protagonista supera o último obstáculo e resolve o conflito
              principal. O terceiro ato termina com uma resolução que fornece um
              senso de encerramento para a história.
            </>
          }
        />

        <CommentsOnPage
          permission={permission}
          comments={commentsStructure}
          isNew={false}
        />
      </ProjectPageLayout>
    </>
  )
}
