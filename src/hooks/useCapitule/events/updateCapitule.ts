import { updateCapituleRequest } from '@api/booksRequests'
import { IRefetchBook } from '@hooks/useBook/types/IRefetchBook'
import { responseDealings } from '@utils/data/responseDealings'
import { IRefetchCapitule } from '../types/IRefetchCapitule'
import { IResolveEvent } from '../types/IResolveEvent'
import { IUpdateCapitule } from '../types/IUpdateCapitule'

export async function updateCapitule(
  capituleId: string,
  bookId: string,
  updatedCapitule: IUpdateCapitule,
  refetchCapitule: IRefetchCapitule,
  refetchBook: IRefetchBook,
): Promise<IResolveEvent> {
  const response = await updateCapituleRequest({
    capituleId,
    bookId,
    capitule: updatedCapitule,
  })

  const { handledAnswer, error } = await responseDealings<IResolveEvent>({
    response,
    callback: () =>
      updateCapitule(
        capituleId,
        bookId,
        updatedCapitule,
        refetchCapitule,
        refetchBook,
      ),
  })

  if (handledAnswer) {
    await Promise.all([refetchCapitule(), refetchBook()])
  }

  return {
    resolved: handledAnswer,
    error,
  }
}
