import { saveImagesInArchiveRequest } from '@api/boxesRequests'
import { ISaveImagesRequest } from '@api/boxesRequests/types/ISaveImagesRequest'
import { responseDealings } from '@utils/data/responseDealings'
import { IRefetchBoxes } from '../types/IRefetchBoxes'
import { IResolveEvent } from '../types/IResolveEvent'

export async function saveImageInArchive(
  newImage: ISaveImagesRequest,
  refetchBoxes: IRefetchBoxes,
): Promise<IResolveEvent> {
  const response = await saveImagesInArchiveRequest(newImage)

  const { handledAnswer, error } = await responseDealings<IResolveEvent>({
    response,
    callback: () => saveImageInArchive(newImage, refetchBoxes),
  })

  if (handledAnswer) {
    await refetchBoxes()
  }

  return {
    resolved: handledAnswer,
    error,
  }
}
