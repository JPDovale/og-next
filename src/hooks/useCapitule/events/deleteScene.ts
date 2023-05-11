import { deleteSceneRequest } from '@api/booksRequests'
import { IRefetchBook } from '@hooks/useBook/types/IRefetchBook'
import { responseDealings } from '@utils/data/responseDealings'
import { IRefetchCapitule } from '../types/IRefetchCapitule'
import { IResolveEvent } from '../types/IResolveEvent'

export async function deleteScene(
  capituleId: string,
  bookId: string,
  sceneId: string,
  refetchCapitule: IRefetchCapitule,
  refetchBook: IRefetchBook,
): Promise<IResolveEvent> {
  const response = await deleteSceneRequest({
    capituleId,
    bookId,
    sceneId,
  })

  const { handledAnswer, error } = await responseDealings<IResolveEvent>({
    response,
    callback: () =>
      deleteScene(capituleId, bookId, sceneId, refetchCapitule, refetchBook),
  })

  if (handledAnswer) {
    await Promise.all([refetchCapitule(), refetchBook()])
  }

  return {
    resolved: handledAnswer,
    error,
  }
}
