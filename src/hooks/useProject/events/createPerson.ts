import { ICreatePersonDTO } from '@api/dtos/ICreatePersonDTO'
import { createPersonRequest } from '@api/personsRequests'
import { IRefetchProjects } from '@hooks/useProjects/types/IRefetchProjects'
import { IResolveEvent } from '@hooks/useProjects/types/IResolveEvent'
import { responseDealings } from '@utils/data/responseDealings'
import { IRefetchProject } from '../types/IRefetchProject'

export async function createPerson(
  projectId: string,
  newPerson: ICreatePersonDTO,
  refetchProject: IRefetchProject,
  refetchProjects: IRefetchProjects,
): Promise<IResolveEvent> {
  const response = await createPersonRequest({ newPerson, projectId })

  const { handledAnswer, error } = await responseDealings<IResolveEvent>({
    response,
    callback: () =>
      createPerson(projectId, newPerson, refetchProject, refetchProjects),
  })

  if (handledAnswer) {
    await Promise.all([refetchProject(), refetchProjects()])
  }

  return {
    resolved: handledAnswer,
    error,
  }
}
