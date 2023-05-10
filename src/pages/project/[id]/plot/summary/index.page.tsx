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

export default function SummaryPage() {
  const [summary, setSummary] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [error, setError] = useState<IError | null>(null)

  const router = useRouter()
  const { id } = router.query
  usePreventBack(`/project/${id}/plot`)

  const { project, projectName, permission, loadingProject, callEvent } =
    useProject(id as string)

  const commentsSummary = project?.comments?.filter(
    (comment) => comment.to_unknown === 'summary',
  )

  async function handleUpdateSummary() {
    setSuccessMessage('')

    if (summary === project?.summary) return

    const updatedPlotOnePhrase: IUpdatePlotDTO = {
      summary: summary || null,
    }

    const { resolved, error } = await callEvent.updatePlot(updatedPlotOnePhrase)

    if (resolved) {
      setSuccessMessage('Resumo atualizado com sucesso.')
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
      <NextSeo title={`${projectName}-Resumo | Magiscrita`} noindex />

      <ProjectPageLayout
        projectName={projectName}
        projectId={`${id}`}
        paths={['Plot', 'Resumo']}
        loading={loadingProject}
        inError={!loadingProject && !project}
        isScrolling
      >
        <Toast
          title="Resumo atualizado"
          message={successMessage}
          open={!!successMessage}
          setOpen={() => setSuccessMessage('')}
        />

        <ToastError error={error} setError={setError} />

        <Editor
          handleUpdate={handleUpdateSummary}
          permission={permission}
          preValue={project?.summary ?? ''}
          projectId={project!.id}
          setValue={setSummary}
          to="summary"
          description={
            <>
              Durante a criação de um livro, o resumo é uma ferramenta útil para
              ajudar o autor a organizar suas ideias e manter o foco na história
              principal. O resumo permite que o autor destaque os pontos mais
              importantes da trama, identifique lacunas na história e ajuste a
              narrativa de acordo com as necessidades.
              <br />
              <br />
              Ao criar um resumo para um livro, é importante que o autor se
              concentre no núcleo da história e descreva os principais eventos e
              personagens de maneira clara e concisa. O resumo pode ajudar o
              autor a evitar detalhes desnecessários ou subtramas que possam
              distrair o leitor da história principal.
              <br />
              <br />O resumo também pode ser usado como uma ferramenta para
              apresentar o livro a editores ou agentes literários. Um resumo bem
              escrito pode ajudar a destacar a originalidade da história e
              despertar o interesse dos profissionais do ramo.
            </>
          }
        />

        <CommentsOnPage
          permission={permission}
          comments={commentsSummary}
          isNew={!project?.summary}
          onNewComment={handleNewComment}
          onNewCommentTo="summary"
        />
      </ProjectPageLayout>
    </>
  )
}
