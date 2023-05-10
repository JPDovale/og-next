import { IUpdatePersonDTO } from '@api/dtos/IUpdatePersonDTO'
import { updatePersonRequest } from '@api/personsRequests'
import { IRefetchProject } from '@hooks/useProject/types/IRefetchProject'
import { IResolveEvent } from '@hooks/useProjects/types/IResolveEvent'
import { responseDealings } from '@utils/data/responseDealings'
import { IRefetchPerson } from '../types/IRefetchPerson'

export async function update(
  personId: string,
  newInfos: IUpdatePersonDTO,
  refetchPerson: IRefetchPerson,
  refetchProject: IRefetchProject,
): Promise<IResolveEvent> {
  const response = await updatePersonRequest(newInfos, personId)

  const { handledAnswer, error } = await responseDealings<IResolveEvent>({
    response,
    callback: () => update(personId, newInfos, refetchPerson, refetchProject),
  })

  if (handledAnswer) {
    await Promise.all([refetchProject(), refetchPerson()])
  }

  return {
    resolved: handledAnswer,
    error,
  }
}
