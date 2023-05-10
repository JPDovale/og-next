import { deleteProjectRequest } from '@api/projectsRequests'
import { IRefetchProjects } from '@hooks/useProjects/types/IRefetchProjects'
import { IResolveEvent } from '@hooks/useProjects/types/IResolveEvent'
import { responseDealings } from '@utils/data/responseDealings'

export async function deleteProject(
  projectId: string,
  refetchProjects: IRefetchProjects,
): Promise<IResolveEvent> {
  const response = await deleteProjectRequest(projectId)

  const { handledAnswer, error } = await responseDealings<IResolveEvent>({
    response,
    callback: () => deleteProject(projectId, refetchProjects),
  })

  if (handledAnswer) {
    await refetchProjects()
  }

  return {
    resolved: handledAnswer,
    error,
  }
}
