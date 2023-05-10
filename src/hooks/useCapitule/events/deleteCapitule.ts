import { deleteCapituleRequest } from '@api/booksRequests'
import { IRefetchBook } from '@hooks/useBook/types/IRefetchBook'
import { responseDealings } from '@utils/data/responseDealings'
import { IResolveEvent } from '../types/IResolveEvent'

export async function deleteCapitule(
  capituleId: string,
  bookId: string,
  refetchBook: IRefetchBook,
): Promise<IResolveEvent> {
  const response = await deleteCapituleRequest({
    capituleId,
    bookId,
  })

  const { handledAnswer, error } = await responseDealings<IResolveEvent>({
    response,
    callback: () => deleteCapitule(capituleId, bookId, refetchBook),
  })

  if (handledAnswer) {
    await refetchBook()
  }

  return {
    resolved: handledAnswer,
    error,
  }
}
