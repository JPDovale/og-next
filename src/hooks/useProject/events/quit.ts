import { quitProjectRequest } from '@api/projectsRequests'
import { IRefetchProjects } from '@hooks/useProjects/types/IRefetchProjects'
import { IResolveEvent } from '@hooks/useProjects/types/IResolveEvent'
import { responseDealings } from '@utils/data/responseDealings'

export async function quitProject(
  projectId: string,
  refetchProjects: IRefetchProjects,
): Promise<IResolveEvent> {
  const response = await quitProjectRequest({ projectId })

  const { handledAnswer, error } = await responseDealings<IResolveEvent>({
    response,
    callback: () => quitProject(projectId, refetchProjects),
  })

  if (handledAnswer) {
    refetchProjects()
  }

  return {
    resolved: handledAnswer,
    error,
  }
}
