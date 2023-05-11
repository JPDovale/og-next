import { removeGenreRequest } from '@api/booksRequests'
import { responseDealings } from '@utils/data/responseDealings'
import { IRefetchBook } from '../types/IRefetchBook'
import { IResolveEvent } from '../types/IResolveEvent'

export async function deleteGenre(
  bookId: string,
  genreId: string,
  refetchBook: IRefetchBook,
): Promise<IResolveEvent> {
  const response = await removeGenreRequest({ genreId, bookId })

  const { handledAnswer, error } = await responseDealings<IResolveEvent>({
    response,
    callback: () => deleteGenre(bookId, genreId, refetchBook),
  })

  if (handledAnswer) {
    await refetchBook()
  }

  return {
    resolved: handledAnswer,
    error,
  }
}
