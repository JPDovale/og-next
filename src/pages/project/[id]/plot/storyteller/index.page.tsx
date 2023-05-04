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

export default function StorytellerPage() {
  const [storyteller, setStoryteller] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [error, setError] = useState<IError | null>(null)

  const router = useRouter()
  const { id } = router.query
  usePreventBack(`/project/${id}/plot`)

  const { project, projectName, permission, loadingProject, callEvent } =
    useProject(id as string)

  const commentsStoryteller = project?.comments?.filter(
    (comment) => comment.to_unknown === 'storyteller',
  )

  async function handleUpdateStoryteller() {
    setSuccessMessage('')

    if (storyteller === project?.storyteller) return

    const updatedPlotOnePhrase: IUpdatePlotDTO = {
      storyteller: storyteller || null,
    }

    const { resolved, error } = await callEvent.updatePlot(updatedPlotOnePhrase)

    if (resolved) {
      setSuccessMessage('Narrador atualizado com sucesso.')
    }

    if (error) {
      setError(error)
    }
  }

  return (
    <>
      <NextSeo title={`${projectName}-Narrador | Magiscrita`} noindex />

      <ProjectPageLayout
        projectName={projectName}
        projectId={`${id}`}
        paths={['plot', 'Narrador']}
        loading={loadingProject}
        inError={!loadingProject && !project}
        isScrolling
      >
        <Toast
          title="Narrador atualizado"
          message={successMessage}
          open={!!successMessage}
          setOpen={() => setSuccessMessage('')}
          type="success"
        />

        <ToastError error={error} setError={setError} />

        <Editor
          handleUpdate={handleUpdateStoryteller}
          permission={permission}
          preValue={project?.storyteller ?? ''}
          projectId={project!.id}
          setValue={setStoryteller}
          to="storyteller"
          description={
            <>
              O narrador é a voz que conta a história em uma obra literária. Ele
              é o ponto de vista através do qual o leitor experimenta a
              narrativa e os personagens da história. O narrador pode assumir
              diversas formas, dependendo do tipo de narrativa e do estilo do
              autor. Ele pode ser uma personagem da história, um observador
              externo ou mesmo um ser sobrenatural.
              <br />
              <br />
              Em alguns casos, o narrador pode ser uma figura confiável que
              fornece informações precisas e imparciais sobre os eventos da
              história. Em outras situações, o narrador pode ser um personagem
              tendencioso, cuja visão distorcida da história influencia a forma
              como os eventos são apresentados.
              <br />
              <br />
              Um exemplo de narrador pode ser encontrado no romance &quot;Moby
              Dick&quot; de Herman Melville. O narrador da história é Ishmael,
              um marinheiro que se une a uma tripulação em busca da baleia
              branca. Ishmael é uma personagem em primeira pessoa, o que
              significa que a história é contada diretamente por ele, dando ao
              leitor uma visão pessoal e íntima dos eventos que se desenrolam. O
              narrador de &quot;Moby Dick&quot; é confiável e imparcial,
              fornecendo uma descrição precisa dos personagens e eventos que
              compõem a história.
            </>
          }
        />

        <CommentsOnPage
          permission={permission}
          comments={commentsStoryteller}
          isNew={!project?.storyteller}
        />
      </ProjectPageLayout>
    </>
  )
}
