import { IUpdatePlotDTO } from '@api/dtos/IUpdatePlotDTO'
import { EditorAndComments } from '@components/ProjectsComponents/EditorAndComments'
import { Toast } from '@components/usefull/Toast'
import { ProjectsContext } from '@contexts/projects'
import { usePreventBack } from '@hooks/usePreventDefaultBack'
import { useProject } from '@hooks/useProject'
import { ProjectPageLayout } from '@layouts/ProjectPageLayout'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'

export default function SubgenrePage() {
  const [successToastOpen, setSuccessToastOpen] = useState(false)
  const [subgenre, setSubgenre] = useState('')
  const [message, setMessage] = useState('')

  const { loading, updatePlot, error, setError } = useContext(ProjectsContext)

  const router = useRouter()
  const { id } = router.query
  usePreventBack(`/project/${id}/plot`)

  const { project, projectName, permission } = useProject(id as string)
  const commentsSubgenre = project?.plot.comments?.filter(
    (comment) => comment.to === 'subgenre',
  )

  async function handleUpdateSubgenre() {
    setMessage('')
    if (subgenre === project?.plot.subgenre) return
    const updatedPlotSubgenre: IUpdatePlotDTO = {
      subgenre,
    }

    await updatePlot(updatedPlotSubgenre, project.id as string)
    setMessage('Subgênero atualizado com sucesso.')
    setSuccessToastOpen(true)
  }

  return (
    <>
      <NextSeo title={`${projectName}-Subgênero | Ognare`} noindex />

      <ProjectPageLayout
        projectName={projectName}
        projectId={`${id}`}
        paths={['Plot', 'Subgênero']}
        loading={loading}
        inError={!loading && !project}
        isScrolling
      >
        <Toast
          title="Subgênero literário atualizado"
          message={message}
          open={successToastOpen}
          setOpen={setSuccessToastOpen}
          type="success"
        />

        <Toast
          title={error?.title!}
          message={error?.message!}
          open={!!error}
          setOpen={() => setError(undefined)}
        />

        <EditorAndComments
          updateValue={handleUpdateSubgenre}
          preValue={project?.plot.subgenre}
          permission={permission}
          comments={commentsSubgenre}
          projectCreatedPerUser={project?.createdPerUser}
          projectId={project?.id as string}
          setValue={setSubgenre}
          to="subgenre"
        />
      </ProjectPageLayout>
    </>
  )
}
