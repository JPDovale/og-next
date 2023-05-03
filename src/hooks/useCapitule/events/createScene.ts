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
): Promise<IResolveEvent> {
  const response = await createSceneRequest({
    capituleId,
    bookId,
    scene,
  })

  const { handledAnswer, error } = await responseDealings<IResolveEvent>({
    response,
    callback: () => createScene(capituleId, bookId, scene, refetchCapitule),
  })

  if (handledAnswer) {
    await refetchCapitule()
  }

  return {
    resolved: handledAnswer,
    error,
  }
}
