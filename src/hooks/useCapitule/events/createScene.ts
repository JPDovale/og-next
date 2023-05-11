import { IRefetchBook } from '@hooks/useBook/types/IRefetchBook'
import { createSceneRequest } from '@api/booksRequests'
import { responseDealings } from '@utils/data/responseDealings'
import { ICreateScene } from '../types/ICreateScene'
import { IRefetchCapitule } from '../types/IRefetchCapitule'
import { IResolveEvent } from '../types/IResolveEvent'

export async function createScene(
  capituleId: string,
  bookId: string,
  scene: ICreateScene,
  refetchCapitule: IRefetchCapitule,
  refetchBook: IRefetchBook,
): Promise<IResolveEvent> {
  const response = await createSceneRequest({
    capituleId,
    bookId,
    scene,
  })

  const { handledAnswer, error } = await responseDealings<IResolveEvent>({
    response,
    callback: () =>
      createScene(capituleId, bookId, scene, refetchCapitule, refetchBook),
  })

  if (handledAnswer) {
    await Promise.all([refetchCapitule(), refetchBook()])
  }

  return {
    resolved: handledAnswer,
    error,
  }
}
