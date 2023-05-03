import { reorderCapitulesRequest } from '@api/booksRequests'
import { responseDealings } from '@utils/data/responseDealings'
import { IRefetchBook } from '../types/IRefetchBook'
import { IResolveEvent } from '../types/IResolveEvent'
import { IReorderCapitules } from '../types/IRorderCapitules'

export async function reorderCapitules(
  bookId: string,
  sequences: IReorderCapitules,
  refetchBook: IRefetchBook,
): Promise<IResolveEvent> {
  const response = await reorderCapitulesRequest({
    bookId,
    sequenceFrom: sequences.sequenceFrom,
    sequenceTo: sequences.sequenceTo,
  })

  const { handledAnswer, error } = await responseDealings<IResolveEvent>({
    response,
    callback: () => reorderCapitules(bookId, sequences, refetchBook),
  })

  if (handledAnswer) {
    await refetchBook()
  }

  return {
    resolved: handledAnswer,
    error,
  }
}
