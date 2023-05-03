import { addGenreRequest } from '@api/booksRequests'
import { responseDealings } from '@utils/data/responseDealings'
import { IRefetchBook } from '../types/IRefetchBook'
import { IResolveEvent } from '../types/IResolveEvent'

export async function createGenre(
  bookId: string,
  genre: string,
  refetchBook: IRefetchBook,
): Promise<IResolveEvent> {
  const response = await addGenreRequest({ bookId, genre })

  const { handledAnswer, error } = await responseDealings<IResolveEvent>({
    response,
    callback: () => createGenre(bookId, genre, refetchBook),
  })

  if (handledAnswer) {
    await refetchBook()
  }

  return {
    resolved: handledAnswer,
    error,
  }
}
