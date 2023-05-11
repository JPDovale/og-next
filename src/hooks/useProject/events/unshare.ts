import { unshareProjectRequest } from '@api/projectsRequests'
import { IRefetchProjects } from '@hooks/useProjects/types/IRefetchProjects'
import { IResolveEvent } from '@hooks/useProjects/types/IResolveEvent'
import { responseDealings } from '@utils/data/responseDealings'
import { IRefetchProject } from '../types/IRefetchProject'

export async function unshare(
  projectId: string,
  userEmail: string,
  refetchProject: IRefetchProject,
  refetchProjects: IRefetchProjects,
): Promise<IResolveEvent> {
  const response = await unshareProjectRequest(userEmail, projectId)

  const { handledAnswer, error } = await responseDealings<IResolveEvent>({
    response,
    callback: () =>
      unshare(projectId, userEmail, refetchProject, refetchProjects),
  })

  if (handledAnswer) {
    await Promise.all([refetchProject(), refetchProjects()])
  }

  return {
    resolved: handledAnswer,
    error,
  }
}
