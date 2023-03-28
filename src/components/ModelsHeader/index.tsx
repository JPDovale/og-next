import { CardModelNewBox } from '@components/BoxesComponents/CardModelNewBox'
import { CardModelNewPerson } from '@components/PersonsComponents/CardModelNewPerson'
import { CardModelNewProject } from '@components/ProjectsComponents/CardModelNewProject'
import { ContainerGrid } from '@components/usefull/ContainerGrid'
import { Heading } from '@components/usefull/Heading'
import { ProjectsContext } from '@contexts/projects'
import { UserContext } from '@contexts/user'
import { useContext } from 'react'

export function ModelsHeader() {
  const { projects } = useContext(ProjectsContext)
  const { user } = useContext(UserContext)

  const projectsEditablePerUser = projects.map((project) => {
    const userPermission = project.users.find((u) => u.id === user?.id)

    if (userPermission?.permission !== 'edit') {
      return undefined
    }

    return project
  })

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
