import { IUpdatePlotDTO } from '@api/dtos/IUpdatePlotDTO'
import { EditorAndComments } from '@components/ProjectsComponents/EditorAndComments'
import { ProjectsContext } from '@contexts/projects'
import { usePreventBack } from '@hooks/usePreventDefaultBack'
import { useProject } from '@hooks/useProject'
import { ProjectPageLayout } from '@layouts/ProjectPageLayout'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'

export default function LiteraryGenerePage() {
  const [literaryGenere, setLiteraryGenere] = useState('')
  const [message, setMessage] = useState('')

  const { loading, updatePlot } = useContext(ProjectsContext)

  const router = useRouter()
  const { id } = router.query
  usePreventBack(`/project/${id}/plot`)

  const { project, projectName, permission } = useProject(id as string)
  const commentsLiteraryGenere = project?.plot.comments?.filter(
    (comment) => comment.to === 'literaryGenere',
  )

  async function handleUpdateLiteraryGenere() {
    setMessage('')
    if (literaryGenere === project?.plot.literaryGenere) return
    const updatedPlotLiteraryGenere: IUpdatePlotDTO = {
      literaryGenere,
    }

    await updatePlot(updatedPlotLiteraryGenere, project.id as string)
    setMessage('Gênero literário atualizado com sucesso.')
  }

  return (
    <>
      <NextSeo title={`${projectName}-Gênero literário | Ognare`} noindex />

      <ProjectPageLayout
        projectName={projectName}
        projectId={`${id}`}
        paths={['Plot', 'Gênero literário']}
        loading={loading}
        inError={!loading && !project}
      >
        <EditorAndComments
          message={message}
          label="Gênero literário"
          updateValue={handleUpdateLiteraryGenere}
          value={literaryGenere}
          preValue={project?.plot.literaryGenere}
          permission={permission}
          comments={commentsLiteraryGenere}
          projectCreatedPerUser={project?.createdPerUser}
          projectId={project?.id as string}
          setValue={setLiteraryGenere}
          to="literaryGenere"
        />
      </ProjectPageLayout>
    </>
  )
}
