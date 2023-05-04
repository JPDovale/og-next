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

export default function DetailsPage() {
  const [details, setDetails] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [error, setError] = useState<IError | null>(null)

  const router = useRouter()
  const { id } = router.query
  usePreventBack(`/project/${id}/plot`)

  const { project, projectName, permission, loadingProject, callEvent } =
    useProject(id as string)

  const commentsDetails = project?.comments?.filter(
    (comment) => comment.to_unknown === 'details',
  )

  async function handleUpdateDetails() {
    setSuccessMessage('')

    if (details === project?.details) return

    const updatedPlotOnePhrase: IUpdatePlotDTO = {
      details: details || null,
    }

    const { resolved, error } = await callEvent.updatePlot(updatedPlotOnePhrase)

    if (resolved) {
      setSuccessMessage('Detalhes atualizados com sucesso.')
    }

    if (error) {
      setError(error)
    }
  }

  return (
    <>
      <NextSeo title={`${projectName}-Detalhes | Magiscrita`} noindex />
      <ProjectPageLayout
        projectName={projectName}
        projectId={`${id}`}
        paths={['Plot', 'Detalhes']}
        loading={loadingProject}
        inError={!loadingProject && !project}
        isScrolling
      >
        <Toast
          title="Detalhes atualizados"
          message={successMessage}
          open={!!successMessage}
          setOpen={() => setSuccessMessage('')}
        />

        <ToastError error={error} setError={setError} />

        <Editor
          handleUpdate={handleUpdateDetails}
          permission={permission}
          preValue={project?.details ?? ''}
          projectId={project!.id}
          setValue={setDetails}
          to="details"
          description={
            <>
              Inclua detalhes importantes da narrativa que não couberam nas
              outras opções até então.
            </>
          }
        />

        <CommentsOnPage
          permission={permission}
          comments={commentsDetails}
          isNew={!project?.details}
        />
      </ProjectPageLayout>
    </>
  )
}
