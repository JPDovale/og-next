import { updateSceneRequest } from '@api/booksRequests'
import { IRefetchBook } from '@hooks/useBook/types/IRefetchBook'
import { responseDealings } from '@utils/data/responseDealings'
import { IRefetchCapitule } from '../types/IRefetchCapitule'
import { IResolveEvent } from '../types/IResolveEvent'
import { IUpdateScene } from '../types/IUpdateScene'

export async function updateScene(
  capituleId: string,
  bookId: string,
  updatedScene: IUpdateScene,
  refetchCapitule: IRefetchCapitule,
  refetchBook: IRefetchBook,
): Promise<IResolveEvent> {
  const response = await updateSceneRequest({
    capituleId,
    bookId,
    scene: updatedScene,
  })

  const { handledAnswer, error } = await responseDealings<IResolveEvent>({
    response,
    callback: () =>
      updateScene(
        capituleId,
        bookId,
        updatedScene,
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
