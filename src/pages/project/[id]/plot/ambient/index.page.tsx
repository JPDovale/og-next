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

export default function AmbientPage() {
  const [ambient, setAmbient] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [error, setError] = useState<IError | null>(null)

  const router = useRouter()
  const { id } = router.query
  usePreventBack(`/project/${id}/plot`)

  const { project, projectName, permission, loadingProject, callEvent } =
    useProject(id as string)

  const commentsAmbient = project?.comments?.filter(
    (comment) => comment.to_unknown === 'ambient',
  )

  async function handleUpdateAmbient() {
    setSuccessMessage('')

    if (ambient === project?.ambient) return

    const updatedPlotOnePhrase: IUpdatePlotDTO = {
      ambient,
    }

    const { resolved, error } = await callEvent.updatePlot(updatedPlotOnePhrase)

    if (resolved) {
      setSuccessMessage('Ambiente atualizado com sucesso.')
    }

    if (error) {
      setError(error)
    }
  }

  return (
    <>
      <NextSeo title={`${projectName}-Ambientação | Ognare`} noindex />

      <ProjectPageLayout
        projectName={projectName}
        projectId={`${id}`}
        paths={['Plot', 'Ambientação']}
        loading={loadingProject}
        inError={!loadingProject && !project}
        isScrolling
      >
        <Toast
          title="Ambiente atualizado"
          message={successMessage}
          open={!!successMessage}
          setOpen={() => setSuccessMessage('')}
        />

        <ToastError error={error} setError={setError} />

        <Editor
          handleUpdate={handleUpdateAmbient}
          permission={permission}
          preValue={project?.ambient ?? ''}
          projectId={project!.id}
          setValue={setAmbient}
          to="ambient"
          description={
            <>
              A ambientação em uma obra literária se refere ao cenário, tempo e
              contexto social em que a história se passa. A ambientação é
              fundamental para dar ao leitor uma sensação de imersão na
              história, criando um mundo ficcional com suas próprias regras e
              características únicas.
              <br />
              <br />A ambientação pode incluir aspectos físicos, como a
              descrição de lugares e paisagens, bem como aspectos culturais,
              sociais e históricos que influenciam a história e os personagens
              da obra. A ambientação pode ajudar a criar um clima específico na
              história, como o suspense, o medo ou a alegria.
              <br />
              <br />
              Um exemplo de obra literária em que a ambientação é fundamental é
              &quot;O Senhor dos Anéis&quot; de J.R.R. Tolkien. A história se
              passa em um mundo ficcional de fantasia chamado Terra Média, que é
              habitado por diversas criaturas, como hobbits, elfos, anões, orcs
              e homens. A ambientação inclui descrições detalhadas dos lugares,
              como as florestas encantadas, montanhas imponentes, cavernas
              escuras e cidades fortificadas.
            </>
          }
        />

        <CommentsOnPage
          permission={permission}
          comments={commentsAmbient}
          isNew={!project?.ambient}
        />
      </ProjectPageLayout>
    </>
  )
}
