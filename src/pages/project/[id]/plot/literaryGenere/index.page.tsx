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

export default function LiteraryGenerePage() {
  const [literaryGenre, setLiteraryGenre] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [error, setError] = useState<IError | null>(null)

  const router = useRouter()
  const { id } = router.query
  usePreventBack(`/project/${id}/plot`)

  const { project, projectName, permission, loadingProject, callEvent } =
    useProject(id as string)

  const commentsLiteraryGenre = project?.collections.comments.itens?.filter(
    (comment) => comment.to_unknown === 'literaryGenre',
  )

  async function handleUpdateLiteraryGenere() {
    setSuccessMessage('')

    if (literaryGenre === project?.plot.literaryGenre) return

    const updatedPlotOnePhrase: IUpdatePlotDTO = {
      literaryGenre: literaryGenre || null,
    }

    const { resolved, error } = await callEvent.updatePlot(updatedPlotOnePhrase)

    if (resolved) {
      setSuccessMessage('Ideia central atualizada com sucesso.')
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
      <NextSeo title={`${projectName}-Gênero literário | Magiscrita`} noindex />

      <ProjectPageLayout
        projectName={projectName}
        projectId={`${id}`}
        paths={['Plot', 'Gênero literário']}
        loading={loadingProject}
        inError={!loadingProject && !project}
        isScrolling
      >
        <Toast
          title="Gênero literário atualizado"
          message={successMessage}
          open={!!successMessage}
          setOpen={() => setSuccessMessage('')}
        />

        <ToastError error={error} setError={setError} />

        <Editor
          handleUpdate={handleUpdateLiteraryGenere}
          permission={permission}
          preValue={project?.plot.literaryGenre ?? ''}
          projectId={project!.id}
          setValue={setLiteraryGenre}
          to="literaryGenre"
          description={
            <>
              O gênero literário é uma categoria ou tipo de obra literária que é
              caracterizada por certas convenções e padrões, tais como a
              estrutura narrativa, os temas abordados e a linguagem utilizada.
              Existem diversos gêneros literários, cada um com suas próprias
              características distintas, que podem ser combinados ou misturados
              em uma única obra.
              <br />
              Alguns exemplos de gêneros literários incluem o romance, a poesia,
              o drama, o conto, a novela, a literatura de não-ficção, a
              fantasia, o suspense, o mistério e a ficção científica.
              <br />
              <br />
              Cada gênero literário tem suas próprias regras e convenções que
              ajudam a orientar o escritor na criação da obra. Por exemplo, o
              romance geralmente tem uma estrutura narrativa complexa, que
              envolve uma trama principal, subtramas, personagens complexos e
              desenvolvimento de caráter. A poesia, por outro lado, pode ser
              mais livre e menos estruturada, com ênfase na linguagem e na
              musicalidade das palavras.
              <br />
              <br />
              O gênero literário também pode ter um impacto sobre o público-alvo
              da obra, influenciando a forma como a história é promovida e
              comercializada.
              <br />
              <br />
              Em resumo, o gênero literário é uma categoria que ajuda a definir
              e identificar os tipos de obras literárias, oferecendo aos
              escritores orientação e aos leitores uma compreensão geral do que
              esperar da obra.
            </>
          }
        />

        <CommentsOnPage
          permission={permission}
          comments={commentsLiteraryGenre}
          isNew={!project?.plot.literaryGenre}
          onNewComment={handleNewComment}
          onNewCommentTo="literaryGenre"
        />
      </ProjectPageLayout>
    </>
  )
}
