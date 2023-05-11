import { updateImagePersonRequest } from '@api/personsRequests'
import { IRefetchProject } from '@hooks/useProject/types/IRefetchProject'
import { IResolveEvent } from '@hooks/useProjects/types/IResolveEvent'
import { responseDealings } from '@utils/data/responseDealings'
import { IRefetchPerson } from '../types/IRefetchPerson'

export async function updateImagePerson(
  personId: string,
  file: File,
  refetchPerson: IRefetchPerson,
  refetchProject: IRefetchProject,
): Promise<IResolveEvent> {
  const response = await updateImagePersonRequest(personId, file)

  const { handledAnswer, error } = await responseDealings<IResolveEvent>({
    response,
    callback: () =>
      updateImagePerson(personId, file, refetchPerson, refetchProject),
  })

  if (handledAnswer) {
    await Promise.all([refetchProject(), refetchPerson()])
  }

  return {
    resolved: handledAnswer,
    error,
  }
}
