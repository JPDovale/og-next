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

export default function SubgenrePage() {
  const [subgenre, setSubgenre] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [error, setError] = useState<IError | null>(null)

  const router = useRouter()
  const { id } = router.query
  usePreventBack(`/project/${id}/plot`)

  const { project, projectName, permission, loadingProject, callEvent } =
    useProject(id as string)

  const commentsSubGenre = project?.collections.comments.itens?.filter(
    (comment) => comment.to_unknown === 'subgenre',
  )

  async function handleUpdateSubgenre() {
    setSuccessMessage('')

    if (subgenre === project?.plot.subgenre) return

    const updatedPlotOnePhrase: IUpdatePlotDTO = {
      subgenre: subgenre || null,
    }

    const { resolved, error } = await callEvent.updatePlot(updatedPlotOnePhrase)

    if (resolved) {
      setSuccessMessage('Subgênero atualizado com sucesso.')
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
      <NextSeo title={`${projectName}-Subgênero | Magiscrita`} noindex />

      <ProjectPageLayout
        projectName={projectName}
        projectId={`${id}`}
        paths={['Plot', 'Subgênero']}
        loading={loadingProject}
        inError={!loadingProject && !project}
        isScrolling
      >
        <Toast
          title="Subgênero literário atualizado"
          message={successMessage}
          open={!!successMessage}
          setOpen={() => setSuccessMessage('')}
        />

        <ToastError error={error} setError={setError} />

        <Editor
          handleUpdate={handleUpdateSubgenre}
          permission={permission}
          preValue={project?.plot.subgenre ?? ''}
          projectId={project!.id}
          setValue={setSubgenre}
          to="subgenre"
          description={
            <>
              Os subgêneros literários são categorias mais específicas dentro de
              um gênero literário. Eles são caracterizados por certas convenções
              e padrões que os diferenciam dos outros subgêneros e gêneros
              literários em geral.
              <br />
              <br />
              Por exemplo, dentro do gênero romance, existem subgêneros como
              romance histórico, romance policial, romance de ficção científica,
              romance de fantasia, romance erótico, entre outros. Cada um desses
              subgêneros tem suas próprias características e convenções, que
              ajudam a orientar o escritor na criação da obra e ajudam o leitor
              a entender o que esperar do livro.
              <br />
              <br />
              O romance histórico, por exemplo, é caracterizado pela sua
              ambientação em um período histórico específico, com uma ênfase na
              pesquisa e na precisão histórica. Já o romance policial é
              caracterizado pela sua trama de mistério e suspense, com uma
              investigação a ser resolvida por um detetive ou investigador.
              <br />
              <br />
              Outros exemplos de subgêneros literários incluem a sátira, a
              fábula, o ensaio, o drama de tribunal, o horror, a comédia
              romântica, entre muitos outros.
              <br />
              <br />
              Cada subgênero literário oferece ao escritor e ao leitor uma
              compreensão mais detalhada do que esperar da obra, ajudando a
              orientar a criação e o consumo da literatura.
            </>
          }
        />

        <CommentsOnPage
          permission={permission}
          comments={commentsSubGenre}
          isNew={!project?.plot.subgenre}
          onNewComment={handleNewComment}
          onNewCommentTo="subgenre"
        />
      </ProjectPageLayout>
    </>
  )
}
