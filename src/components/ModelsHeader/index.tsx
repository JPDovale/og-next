import { CardModelNewBox } from '@components/BoxesComponents/CardModelNewBox'
import { CardModelNewPerson } from '@components/PersonsComponents/CardModelNewPerson'
import { CardModelNewProject } from '@components/ProjectsComponents/CardModelNewProject'
import { ContainerGrid } from '@components/usefull/ContainerGrid'
import { Heading } from '@components/usefull/Heading'
import { useProjects } from '@hooks/useProjects'

export function ModelsHeader() {
  const { projectsEditablePerUser } = useProjects()

  return (
    <>
      <Heading size="sm">Modelos:</Heading>
      <ContainerGrid padding={0} columns={3} css={{ gap: '$8' }}>
        <CardModelNewProject />
        <CardModelNewPerson disabled={projectsEditablePerUser.length === 0} />
        <CardModelNewBox />
      </ContainerGrid>
    </>
  )
}
