import { IError } from '@@types/errors/IError'
import { ICreateCommentDTO } from '@api/dtos/ICreateNewCommentDTO'
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

export default function PremisePage() {
  const [premise, setPremise] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [error, setError] = useState<IError | null>(null)

  const router = useRouter()
  const { id } = router.query
  usePreventBack(`/project/${id}/plot`)

  const { project, projectName, permission, loadingProject, callEvent } =
    useProject(id as string)

  const commentsPremise = project?.collections.comments.itens?.filter(
    (comment) => comment.to_unknown === 'premise',
  )

  async function handleUpdatePremise() {
    setSuccessMessage('')

    if (premise === project?.plot.premise) return

    const updatedPlotOnePhrase: IUpdatePlotDTO = {
      premise: premise || null,
    }

    const { resolved, error } = await callEvent.updatePlot(updatedPlotOnePhrase)

    if (resolved) {
      setSuccessMessage('Premissa atualizada com sucesso.')
    }

    if (error) {
      setError(error)
    }
  }

  async function handleNewComment(newComment: ICreateCommentDTO) {
    const { error, resolved } = await callEvent.commentInPlot(newComment)

    if (error) {
      setError(error)
    }

    if (resolved) {
      setSuccessMessage('Comentário criado com sucesso')
    }
  }

  return (
    <>
      <NextSeo title={`${projectName}-Premissa | Magiscrita`} noindex />

      <ProjectPageLayout
        projectName={projectName}
        projectId={`${id}`}
        paths={['plot', 'Premissa']}
        loading={loadingProject}
        inError={!loadingProject && !project}
        isScrolling
      >
        <Toast
          title="Premissa atualizada"
          message={successMessage}
          open={!!successMessage}
          setOpen={() => setSuccessMessage('')}
        />

        <ToastError error={error} setError={setError} />

        <Editor
          handleUpdate={handleUpdatePremise}
          permission={permission}
          preValue={project?.plot.premise ?? ''}
          projectId={project!.id}
          setValue={setPremise}
          to="premise"
          description={
            <>
              A premissa é a base ou fundação da história na escrita criativa. É
              a ideia geral ou conceito que serve como ponto de partida para a
              criação da obra literária. A premissa é geralmente uma breve
              descrição do enredo ou da trama, que apresenta o conflito
              principal, os personagens centrais e o cenário em que a história
              se passa. É a partir da premissa que o escritor desenvolve a
              narrativa, criando os detalhes e nuances que dão vida à história.
              <br />
              <br />
              Um exemplo de premissa pode ser encontrada no romance &quot;O
              Grande Gatsby&quot; de F. Scott Fitzgerald. A premissa do livro é
              a busca de Jay Gatsby, um milionário misterioso, para reconquistar
              seu amor de juventude, Daisy Buchanan. A história é ambientada na
              década de 1920, na era do jazz e da extravagância, e apresenta uma
              crítica à riqueza e ostentação da época. A premissa de &quot;O
              Grande Gatsby&quot; serve como o ponto de partida para o
              desenvolvimento da história, à medida que o autor explora os
              personagens, conflitos e temas que cercam a busca de Gatsby por
              Daisy.
            </>
          }
        />

        <CommentsOnPage
          permission={permission}
          comments={commentsPremise}
          isNew={!project?.plot.premise}
          onNewComment={handleNewComment}
          onNewCommentTo="premise"
        />
      </ProjectPageLayout>
    </>
  )
}
