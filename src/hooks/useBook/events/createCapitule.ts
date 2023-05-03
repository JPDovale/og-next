import { createCapituleRequest } from '@api/booksRequests'
import { responseDealings } from '@utils/data/responseDealings'
import { ICreateCapitule } from '../types/ICreateCapitule'
import { IRefetchBook } from '../types/IRefetchBook'
import { IResolveEvent } from '../types/IResolveEvent'

export async function createCapitule(
  bookId: string,
  capitule: ICreateCapitule,
  refetchBook: IRefetchBook,
): Promise<IResolveEvent> {
  const response = await createCapituleRequest({ bookId, capitule })

  const { handledAnswer, error } = await responseDealings<IResolveEvent>({
    response,
    callback: () => createCapitule(bookId, capitule, refetchBook),
  })

  if (handledAnswer) {
    await refetchBook()
  }

  return {
    resolved: handledAnswer,
    error,
  }
}
