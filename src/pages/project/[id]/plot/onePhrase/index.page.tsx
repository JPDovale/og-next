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

export default function OnePhrasePage() {
  const [onePhrase, setOnePhrase] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [error, setError] = useState<IError | null>(null)

  const router = useRouter()
  const { id } = router.query
  usePreventBack(`/project/${id}/plot`)

  const { project, projectName, permission, loadingProject, callEvent } =
    useProject(id as string)

  const commentsOnePhrase = project?.comments?.filter(
    (comment) => comment.to_unknown === 'onePhrase',
  )

  async function handleUpdateOnePhrase() {
    setSuccessMessage('')

    if (onePhrase === project?.one_phrase) return

    const updatedPlotOnePhrase: IUpdatePlotDTO = {
      onePhrase,
    }

    const { resolved, error } = await callEvent.updatePlot(updatedPlotOnePhrase)

    if (resolved) {
      setSuccessMessage('Ideia central atualizada com sucesso.')
    }

    if (error) {
      setError(error)
    }
  }

  return (
    <>
      <NextSeo title={`${projectName}-Ideia central | Ognare`} noindex />

      <ProjectPageLayout
        projectName={projectName}
        projectId={`${id}`}
        paths={['Plot', 'Ideia central']}
        loading={loadingProject}
        inError={!loadingProject && !project}
        isScrolling
      >
        <Toast
          title="Ideia central atualizada"
          message={successMessage}
          open={!!successMessage}
          setOpen={() => setSuccessMessage('')}
        />

        <ToastError error={error} setError={setError} />

        <Editor
          handleUpdate={handleUpdateOnePhrase}
          permission={permission}
          preValue={project?.one_phrase ?? ''}
          projectId={project!.id}
          setValue={setOnePhrase}
          to="onePhrase"
          description={
            <>
              A ideia central, no contexto da escrita criativa, refere-se ao
              tema principal ou conceito central que é explorado em uma obra
              literária. É a ideia fundamental que dá sentido e coesão ao texto,
              fornecendo uma estrutura para a narrativa ou poema. A ideia
              central é geralmente expressa de forma explícita ou implícita ao
              longo da obra, e pode ser um comentário sobre a natureza humana,
              uma reflexão sobre a vida, uma análise da sociedade ou uma
              exploração de um conceito abstrato. Em resumo, a ideia central é o
              coração da obra literária, dando significado e propósito à
              narrativa.
              <br />
              <br />
              Um exemplo de ideia central pode ser encontrada no romance
              &quot;1984&quot; de George Orwell. A ideia central do livro é a
              crítica à tirania e ao totalitarismo, representado pelo governo
              autoritário e controlador descrito na obra. A história é centrada
              em Winston Smith, um homem que trabalha para o governo e se rebela
              contra o controle opressivo que o Estado exerce sobre a vida das
              pessoas. Ao longo do livro, Orwell explora temas como a liberdade,
              a manipulação da verdade e a repressão da individualidade em uma
              sociedade que busca controlar todos os aspectos da vida das
              pessoas. A ideia central de &quot;1984&quot; é claramente expressa
              em toda a obra, tornando-se a mensagem principal que o autor
              deseja transmitir aos leitores.
            </>
          }
        />

        <CommentsOnPage
          permission={permission}
          comments={commentsOnePhrase}
          isNew={!project?.one_phrase}
        />
      </ProjectPageLayout>
    </>
  )
}
