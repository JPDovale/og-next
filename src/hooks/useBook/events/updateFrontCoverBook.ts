import { updateFrontCoverRequest } from '@api/booksRequests'
import { responseDealings } from '@utils/data/responseDealings'
import { IRefetchBook } from '../types/IRefetchBook'
import { IResolveEvent } from '../types/IResolveEvent'

export async function updateFrontCoverBook(
  bookId: string,
  file: File,
  refetchBook: IRefetchBook,
): Promise<IResolveEvent> {
  const response = await updateFrontCoverRequest({ bookId, file })

  const { handledAnswer, error } = await responseDealings<IResolveEvent>({
    response,
    callback: () => updateFrontCoverBook(bookId, file, refetchBook),
  })

  if (handledAnswer) {
    await refetchBook()
  }

  return {
    resolved: handledAnswer,
    error,
  }
}
