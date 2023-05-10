import { removeFrontCoverRequest } from '@api/booksRequests'
import { responseDealings } from '@utils/data/responseDealings'
import { IRefetchBook } from '../types/IRefetchBook'
import { IResolveEvent } from '../types/IResolveEvent'

export async function removeFrontCoverBook(
  bookId: string,
  refetchBook: IRefetchBook,
): Promise<IResolveEvent> {
  const response = await removeFrontCoverRequest(bookId)

  const { handledAnswer, error } = await responseDealings<IResolveEvent>({
    response,
    callback: () => removeFrontCoverBook(bookId, refetchBook),
  })

  if (handledAnswer) {
    await refetchBook()
  }

  return {
    resolved: handledAnswer,
    error,
  }
}
