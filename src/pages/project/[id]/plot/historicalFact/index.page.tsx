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

export default function HistoricalFactPage() {
  const [historicalFact, setHistoricalFact] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [error, setError] = useState<IError | null>(null)

  const router = useRouter()
  const { id } = router.query
  usePreventBack(`/project/${id}/plot`)

  const { project, projectName, permission, loadingProject, callEvent } =
    useProject(id as string)

  const commentsHistoricalFact = project?.collections.comments.itens?.filter(
    (comment) => comment.to_unknown === 'historicalFact',
  )

  async function handleUpdateHistoricalFact() {
    setSuccessMessage('')

    if (historicalFact === project?.plot.historicalFact) return

    const updatedPlotOnePhrase: IUpdatePlotDTO = {
      historicalFact: historicalFact || null,
    }

    const { resolved, error } = await callEvent.updatePlot(updatedPlotOnePhrase)

    if (resolved) {
      setSuccessMessage('Fato histórico atualizado com sucesso.')
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
      <NextSeo title={`${projectName}-Fato histórico | Magiscrita`} noindex />

      <ProjectPageLayout
        projectName={projectName}
        projectId={`${id}`}
        paths={['Plot', 'Fato histórico']}
        loading={loadingProject}
        inError={!loadingProject && !project}
        isScrolling
      >
        <Toast
          title="Fato histórico atualizado"
          message={successMessage}
          open={!!successMessage}
          setOpen={() => setSuccessMessage('')}
        />

        <ToastError error={error} setError={setError} />

        <Editor
          handleUpdate={handleUpdateHistoricalFact}
          permission={permission}
          preValue={project?.plot.historicalFact ?? ''}
          projectId={project!.id}
          setValue={setHistoricalFact}
          to="historicalFact"
          description={
            <>
              Fatos históricos podem ser uma parte fundamental da construção de
              um livro, pois podem fornecer um contexto autêntico e realista
              para a história e os personagens. Ao usar fatos históricos em um
              livro, o autor pode ajudar a transportar o leitor para outra
              época, evocar sentimentos de nostalgia ou oferecer uma perspectiva
              mais ampla sobre a sociedade e a condição humana.
              <br />
              <br />
              No entanto, é importante que o autor faça uma pesquisa completa e
              cuidadosa dos fatos históricos, a fim de garantir a precisão e
              autenticidade da obra. A inclusão de fatos históricos precisos
              pode ajudar a aumentar a credibilidade e a qualidade do trabalho,
              enquanto a falta de precisão ou a inclusão de informações falsas
              pode diminuir o valor da obra e alienar os leitores.
              <br />
              <br />
              Um exemplo de como um fato histórico pode ser usado na construção
              de um livro é o romance &quot;O Nome da Rosa&quot; de Umberto Eco,
              que é ambientado em um mosteiro medieval no século XIV. O autor
              usa fatos históricos precisos para retratar a vida cotidiana dos
              monges e a sociedade medieval, incluindo detalhes sobre as
              práticas religiosas, a arquitetura e a vida política da época.
              Esses fatos históricos ajudam a transportar o leitor para outra
              época e oferecem uma visão autêntica e realista da vida na Idade
              Média.
            </>
          }
        />

        <CommentsOnPage
          permission={permission}
          comments={commentsHistoricalFact}
          isNew={!project?.plot.historicalFact}
          onNewComment={handleNewComment}
          onNewCommentTo="historicalFact"
        />
      </ProjectPageLayout>
    </>
  )
}
