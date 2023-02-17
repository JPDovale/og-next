import { IUpdatePlotDTO } from '@api/dtos/IUpdatePlotDTO'
import { EditorAndComments } from '@components/ProjectsComponents/EditorAndComments'
import { ProjectsContext } from '@contexts/projects'
import { usePreventBack } from '@hooks/usePreventDefaultBack'
import { useProject } from '@hooks/useProject'
import { ProjectPageLayout } from '@layouts/ProjectPageLayout'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'

export default function SubgenrePage() {
  const [subgenre, setSubgenre] = useState('')
  const [message, setMessage] = useState('')

  const { loading, updatePlot } = useContext(ProjectsContext)

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
      >
        <EditorAndComments
          message={message}
          label="Subgênero"
          updateValue={handleUpdateSubgenre}
          value={subgenre}
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
