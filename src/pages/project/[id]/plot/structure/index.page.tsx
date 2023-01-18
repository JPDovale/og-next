import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { IUpdatePlotDTO } from '../../../../../api/dtos/IUpdatePlotDTO'
import { IProjectResponse } from '../../../../../api/responsesTypes/IProjcetResponse'
import { EditorAndComments } from '../../../../../components/EditorAndComments'
import { ProjectsContext } from '../../../../../contexts/projects'
import { UserContext } from '../../../../../contexts/user'
import { ProjectPageLayout } from '../../../../../layouts/ProjectPageLayout'

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

  const { projects, loading, updatePlot } = useContext(ProjectsContext)
  const { user } = useContext(UserContext)

  const router = useRouter()
  const { id } = router.query

  const project = projects.find(
    (project) => project.id === id,
  ) as IProjectResponse

  const commentsStructure = project?.plot.comments?.filter(
    (comment) => comment.to === 'structure',
  )

  const act1 = structure.find((i) => i.key === 'act1') as IStructure
  const act2 = structure.find((i) => i.key === 'act2') as IStructure
  const act3 = structure.find((i) => i.key === 'act3') as IStructure

  const userInProject = project?.users.find((u) => u.id === user?.id)

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
    <ProjectPageLayout
      projectName={project?.name}
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
        permission={userInProject?.permission}
        comments={commentsStructure}
        projectCreatedPerUser={project?.createdPerUser}
        projectId={project?.id as string}
        setValue={setStructure}
        to="structure"
      />
    </ProjectPageLayout>
  )
}
