import { ICreateProjectDTO } from '@api/dtos/ICreateProjectDTO'
import { createProjectRequest } from '@api/projectsRequests'
import { responseDealings } from '@utils/data/responseDealings'
import { IRefetchProjects } from '../types/IRefetchProjects'
import { IResolveEvent } from '../types/IResolveEvent'

export async function createProject(
  newProject: ICreateProjectDTO,
  refetchProjects: IRefetchProjects,
): Promise<IResolveEvent> {
  const response = await createProjectRequest(newProject)

  const { handledAnswer, error } = await responseDealings<IResolveEvent>({
    response,
    callback: () => createProject(newProject, refetchProjects),
  })

  if (handledAnswer) {
    refetchProjects()
  }

  return {
    resolved: handledAnswer,
    error,
  }
}
