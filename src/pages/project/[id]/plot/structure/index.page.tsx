import { IUpdatePlotDTO } from '@api/dtos/IUpdatePlotDTO'
import { EditorAndComments } from '@components/ProjectsComponents/EditorAndComments'
import { ProjectsContext } from '@contexts/projects'
import { usePreventBack } from '@hooks/usePreventDefaultBack'
import { useProject } from '@hooks/useProject'
import { ProjectPageLayout } from '@layouts/ProjectPageLayout'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'

interface IStructure {
  key: 'act1' | 'act2' | 'act3'
  value: string
  changed: boolean
}

export default function StructurePage() {
  const [structure, setStructure] = useState<IStructure[]>([
    { key: 'act1', value: '', changed: false },
    { key: 'act2', value: '', changed: false },
    { key: 'act3', value: '', changed: false },
  ])
  const [message, setMessage] = useState('')

  const { loading, updatePlot } = useContext(ProjectsContext)

  const router = useRouter()
  const { id } = router.query
  usePreventBack(`/project/${id}/plot`)

  const { project, projectName, permission } = useProject(id as string)
  const commentsStructure = project?.plot.comments?.filter(
    (comment) => comment.to === 'structure',
  )

  const act1 = structure.find((i) => i.key === 'act1') as IStructure
  const act2 = structure.find((i) => i.key === 'act2') as IStructure
  const act3 = structure.find((i) => i.key === 'act3') as IStructure

  async function handleUpdateStructure() {
    setMessage('')
    if (structure === project.plot.structure) return
    const updatedPlotStructure: IUpdatePlotDTO = {
      structure: {
        act1: act1.changed ? act1?.value : project.plot.structure?.act1,
        act2: act2.changed ? act2?.value : project.plot.structure?.act2,
        act3: act3.changed ? act3?.value : project.plot.structure?.act3,
      },
    }

    await updatePlot(updatedPlotStructure, project.id as string)
    setMessage('Estrutura atualizada com sucesso.')
  }

  return (
    <>
      <NextSeo title={`${projectName}-Estrutura de 3 atos | Ognare`} noindex />

      <ProjectPageLayout
        projectName={projectName}
        projectId={`${id}`}
        paths={['Plot', 'Estrutura']}
        loading={loading}
        inError={!loading && !project}
      >
        <EditorAndComments
          toMany={[
            { key: 'act1', label: 'Ato 1' },
            { key: 'act2', label: 'Ato 2' },
            { key: 'act3', label: 'Ato 3' },
          ]}
          preValueToMany={[
            act1?.value || (project?.plot.structure?.act1 as string),
            act2?.value || (project?.plot.structure?.act2 as string),
            act3?.value || (project?.plot.structure?.act3 as string),
          ]}
          message={message}
          label="Estrutura"
          updateValue={handleUpdateStructure}
          value={structure}
          preValue={project?.plot.structure?.act1}
          permission={permission}
          comments={commentsStructure}
          projectCreatedPerUser={project?.createdPerUser}
          projectId={project?.id as string}
          setValue={setStructure}
          to="structure"
        />
      </ProjectPageLayout>
    </>
  )
}
