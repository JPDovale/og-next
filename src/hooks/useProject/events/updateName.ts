import { updateNameProjectRequest } from '@api/projectsRequests'
import { IRefetchProjects } from '@hooks/useProjects/types/IRefetchProjects'
import { IResolveEvent } from '@hooks/useProjects/types/IResolveEvent'
import { responseDealings } from '@utils/data/responseDealings'
import { IRefetchProject } from '../types/IRefetchProject'

export async function updateName(
  projectId: string,
  newName: string,
  refetchProject: IRefetchProject,
  refetchProjects: IRefetchProjects,
): Promise<IResolveEvent> {
  const response = await updateNameProjectRequest(newName, projectId)

  const { handledAnswer, error } = await responseDealings<IResolveEvent>({
    response,
    callback: () =>
      updateName(projectId, newName, refetchProject, refetchProjects),
  })

  if (handledAnswer) {
    await Promise.all([refetchProject(), refetchProjects()])
  }

  return {
    resolved: handledAnswer,
    error,
  }
}
