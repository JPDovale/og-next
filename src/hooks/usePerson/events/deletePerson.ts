import { deletePersonRequest } from '@api/personsRequests'
import { IRefetchProject } from '@hooks/useProject/types/IRefetchProject'
import { IRefetchProjects } from '@hooks/useProjects/types/IRefetchProjects'
import { IResolveEvent } from '@hooks/useProjects/types/IResolveEvent'
import { responseDealings } from '@utils/data/responseDealings'

export async function deletePerson(
  personId: string,
  refetchProject: IRefetchProject,
  refetchProjects: IRefetchProjects,
): Promise<IResolveEvent> {
  const response = await deletePersonRequest(personId)

  const { handledAnswer, error } = await responseDealings<IResolveEvent>({
    response,
    callback: () => deletePerson(personId, refetchProject, refetchProjects),
  })

  if (handledAnswer) {
    await Promise.all([refetchProject(), refetchProjects()])
  }

  return {
    resolved: handledAnswer,
    error,
  }
}
