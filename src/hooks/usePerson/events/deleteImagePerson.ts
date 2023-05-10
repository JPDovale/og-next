import { deleteImagePersonRequest } from '@api/personsRequests'
import { IRefetchProject } from '@hooks/useProject/types/IRefetchProject'
import { IResolveEvent } from '@hooks/useProjects/types/IResolveEvent'
import { responseDealings } from '@utils/data/responseDealings'
import { IRefetchPerson } from '../types/IRefetchPerson'

export async function deleteImagePerson(
  personId: string,
  refetchPerson: IRefetchPerson,
  refetchProject: IRefetchProject,
): Promise<IResolveEvent> {
  const response = await deleteImagePersonRequest({ personId })

  const { handledAnswer, error } = await responseDealings<IResolveEvent>({
    response,
    callback: () => deleteImagePerson(personId, refetchPerson, refetchProject),
  })

  if (handledAnswer) {
    await Promise.all([refetchProject(), refetchPerson()])
  }

  return {
    resolved: handledAnswer,
    error,
  }
}
