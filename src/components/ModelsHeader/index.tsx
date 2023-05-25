import { CardModelNewBox } from '@components/BoxesComponents/CardModelNewBox'
import { ModelCardSkeleton } from '@components/ModelCard/skeleton'
import { CardModelNewPerson } from '@components/PersonsComponents/CardModelNewPerson'
import { CardModelNewProject } from '@components/ProjectsComponents/CardModelNewProject'
import { ContainerGrid } from '@components/usefull/ContainerGrid'
import { Heading } from '@components/usefull/Heading'
import { useProjects } from '@hooks/useProjects'
import { useUser } from '@hooks/useUser'

export function ModelsHeader() {
  const { projectsEditablePerUser, loadingProjects } = useProjects()
  const { loadingUser } = useUser()

  return (
    <>
      <Heading size="sm">Modelos:</Heading>
      <ContainerGrid padding={0} columns={3} css={{ gap: '$8' }}>
        {loadingProjects || loadingUser ? (
          <>
            <ModelCardSkeleton />
            <ModelCardSkeleton />
            <ModelCardSkeleton />
          </>
        ) : (
          <>
            <CardModelNewProject />
            <CardModelNewPerson
              disabled={projectsEditablePerUser.length === 0}
            />
            <CardModelNewBox />
          </>
        )}
      </ContainerGrid>
    </>
  )
}
