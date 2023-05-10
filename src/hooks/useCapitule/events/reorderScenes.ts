import { reorderScenesRequest } from '@api/booksRequests'
import { responseDealings } from '@utils/data/responseDealings'
import { IRefetchCapitule } from '../types/IRefetchCapitule'
import { IResolveEvent } from '../types/IResolveEvent'
import { IReorderScenes } from '../types/IRorderScenes'

export async function reorderScenes(
  capituleId: string,
  bookId: string,
  sequences: IReorderScenes,
  refetchCapitule: IRefetchCapitule,
): Promise<IResolveEvent> {
  const response = await reorderScenesRequest({
    bookId,
    capituleId,
    sequences,
  })

  const { handledAnswer, error } = await responseDealings<IResolveEvent>({
    response,
    callback: () =>
      reorderScenes(capituleId, bookId, sequences, refetchCapitule),
  })

  if (handledAnswer) {
    await refetchCapitule()
  }

  return {
    resolved: handledAnswer,
    error,
  }
}
