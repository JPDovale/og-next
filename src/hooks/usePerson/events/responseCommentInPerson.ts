import { responseCommentInPersonRequest } from '@api/personsRequests'
import { IResolveEvent } from '@hooks/useProjects/types/IResolveEvent'
import { responseDealings } from '@utils/data/responseDealings'
import { ICreateResponseInPerson } from '../types/ICreateResponseInPerson'
import { IRefetchPerson } from '../types/IRefetchPerson'

export async function responseCommentInPerson(
  personId: string,
  objectResponse: ICreateResponseInPerson,
  refetchPerson: IRefetchPerson,
): Promise<IResolveEvent> {
  const response = await responseCommentInPersonRequest(
    personId,
    objectResponse.commentId,
    { content: objectResponse.content },
  )

  const { handledAnswer, error } = await responseDealings<IResolveEvent>({
    response,
    callback: () =>
      responseCommentInPerson(personId, objectResponse, refetchPerson),
  })

  if (handledAnswer) {
    await Promise.all([refetchPerson()])
  }

  return {
    resolved: handledAnswer,
    error,
  }
}
