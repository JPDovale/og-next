import { updateBookRequest } from '@api/booksRequests'
import { responseDealings } from '@utils/data/responseDealings'
import { IRefetchBook } from '../types/IRefetchBook'
import { IResolveEvent } from '../types/IResolveEvent'
import { IUpdateBook } from '../types/IUpdateBook'

export async function updateBook(
  bookId: string,
  updatedBook: IUpdateBook,
  refetchBook: IRefetchBook,
): Promise<IResolveEvent> {
  const response = await updateBookRequest({ bookId, updatedBook })

  const { handledAnswer, error } = await responseDealings<IResolveEvent>({
    response,
    callback: () => updateBook(bookId, updatedBook, refetchBook),
  })

  if (handledAnswer) {
    await refetchBook()
  }

  return {
    resolved: handledAnswer,
    error,
  }
}
