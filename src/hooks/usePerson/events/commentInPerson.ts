import { commentInPersonRequest } from '@api/personsRequests'
import { IResolveEvent } from '@hooks/useProjects/types/IResolveEvent'
import { responseDealings } from '@utils/data/responseDealings'
import { ICreateCommentObject } from '../types/ICreateCommentObject'
import { IRefetchPerson } from '../types/IRefetchPerson'

export async function commentInPerson(
  personId: string,
  objectComment: ICreateCommentObject,
  refetchPerson: IRefetchPerson,
): Promise<IResolveEvent> {
  const response = await commentInPersonRequest({ personId, objectComment })

  const { handledAnswer, error } = await responseDealings<IResolveEvent>({
    response,
    callback: () => commentInPerson(personId, objectComment, refetchPerson),
  })

  if (handledAnswer) {
    await Promise.all([refetchPerson()])
  }

  return {
    resolved: handledAnswer,
    error,
  }
}
