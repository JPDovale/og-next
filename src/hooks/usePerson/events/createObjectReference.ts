import { createObjectReferenceInPersonRequest } from '@api/personsRequests'
import { IResolveEvent } from '@hooks/useProjects/types/IResolveEvent'
import { responseDealings } from '@utils/data/responseDealings'
import { ICreateObjectReference } from '../types/ICreateObjectReference'
import { IRefetchPerson } from '../types/IRefetchPerson'
import { keysPaths } from '../utils/keysPaths'

export async function createObjectReference(
  personId: string,
  newReference: ICreateObjectReference,
  refetchPerson: IRefetchPerson,
): Promise<IResolveEvent> {
  const response = await createObjectReferenceInPersonRequest({
    path: keysPaths[newReference.path],
    referenceId: newReference.referenceId,
    personId,
  })

  const { handledAnswer, error } = await responseDealings<IResolveEvent>({
    response,
    callback: () =>
      createObjectReference(personId, newReference, refetchPerson),
  })

  if (handledAnswer) {
    await Promise.all([refetchPerson()])
  }

  return {
    resolved: handledAnswer,
    error,
  }
}
