import { createObjectInPersonRequest } from '@api/personsRequests'
import { IResolveEvent } from '@hooks/useProjects/types/IResolveEvent'
import { responseDealings } from '@utils/data/responseDealings'
import { ICreateObject } from '../types/ICreateObject'
import { IRefetchPerson } from '../types/IRefetchPerson'
import { keysPaths } from '../utils/keysPaths'

export async function createObject<TypeObject>(
  personId: string,
  newObject: ICreateObject<TypeObject>,
  refetchPerson: IRefetchPerson,
): Promise<IResolveEvent> {
  const response = await createObjectInPersonRequest({
    object: newObject.object,
    path: keysPaths[newObject.path],
    personId,
  })

  const { handledAnswer, error } = await responseDealings<IResolveEvent>({
    response,
    callback: () => createObject(personId, newObject, refetchPerson),
  })

  if (handledAnswer) {
    await Promise.all([refetchPerson()])
  }

  return {
    resolved: handledAnswer,
    error,
  }
}
