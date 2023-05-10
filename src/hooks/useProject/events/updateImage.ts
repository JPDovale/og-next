import { updateImageProjectRequest } from '@api/projectsRequests'
import { IRefetchProjects } from '@hooks/useProjects/types/IRefetchProjects'
import { IResolveEvent } from '@hooks/useProjects/types/IResolveEvent'
import { responseDealings } from '@utils/data/responseDealings'
import { IRefetchProject } from '../types/IRefetchProject'

export async function updateImage(
  projectId: string,
  file: File,
  refetchProject: IRefetchProject,
  refetchProjects: IRefetchProjects,
): Promise<IResolveEvent> {
  const response = await updateImageProjectRequest(projectId, file)

  const { handledAnswer, error } = await responseDealings<IResolveEvent>({
    response,
    callback: () =>
      updateImage(projectId, file, refetchProject, refetchProjects),
  })

  if (handledAnswer) {
    await Promise.all([refetchProject(), refetchProjects()])
  }

  return {
    resolved: handledAnswer,
    error,
  }
}
