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

export default function CountTimePage() {
  const [countTime, setCountTime] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [error, setError] = useState<IError | null>(null)

  const router = useRouter()
  const { id } = router.query
  usePreventBack(`/project/${id}/plot`)

  const { project, projectName, permission, loadingProject, callEvent } =
    useProject(id as string)

  const commentsCountTime = project?.comments?.filter(
    (comment) => comment.to_unknown === 'countTime',
  )

  async function handleUpdateCountTime() {
    setSuccessMessage('')

    if (countTime === project?.count_time) return

    const updatedPlotOnePhrase: IUpdatePlotDTO = {
      countTime: countTime || null,
    }

    const { resolved, error } = await callEvent.updatePlot(updatedPlotOnePhrase)

    if (resolved) {
      setSuccessMessage('Tempo em que se passa atualizado com sucesso.')
    }

    if (error) {
      setError(error)
    }
  }

  return (
    <>
      <NextSeo
        title={`${projectName}-Tempo em que se passa | Magiscrita`}
        noindex
      />
      <ProjectPageLayout
        projectName={projectName}
        projectId={`${id}`}
        paths={['Plot', 'Tempo em que se passa']}
        loading={loadingProject}
        inError={!loadingProject && !project}
        isScrolling
      >
        <Toast
          title="Tempo em que se passa atualizado"
          message={successMessage}
          open={!!successMessage}
          setOpen={() => setSuccessMessage('')}
        />

        <ToastError error={error} setError={setError} />

        <Editor
          handleUpdate={handleUpdateCountTime}
          permission={permission}
          preValue={project?.count_time ?? ''}
          projectId={project!.id}
          setValue={setCountTime}
          to="countTime"
          description={
            <>
              O tempo em que uma história se passa é outro aspecto importante da
              ambientação em uma obra literária. O tempo pode se referir à época
              histórica em que a história é ambientada ou ao período de tempo em
              que os eventos da história ocorrem.
              <br />
              <br />
              A escolha do tempo é fundamental para criar um contexto adequado
              para a história e os personagens, bem como para transmitir ideias
              e mensagens mais amplas sobre a sociedade e a condição humana. O
              tempo também pode afetar a trama e o enredo da história,
              permitindo que eventos históricos ou sociais sejam usados como
              parte da narrativa.
              <br />
              <br />
              Um exemplo é o romance &quot;Orgulho e Preconceito&quot; de Jane
              Austen, que é ambientado no final do século XVIII, durante a
              Regência inglesa. A ambientação no período histórico e social
              específico é fundamental para a compreensão da obra, pois ajuda o
              leitor a entender os valores, costumes e expectativas da época.
            </>
          }
        />

        <CommentsOnPage
          permission={permission}
          comments={commentsCountTime}
          isNew={!project?.count_time}
        />
      </ProjectPageLayout>
    </>
  )
}
