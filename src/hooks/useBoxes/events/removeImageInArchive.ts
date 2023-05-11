import { deleteImageInArchiveRequest } from '@api/boxesRequests'
import { IDeleteImageInArchiveRequest } from '@api/boxesRequests/types/IDeleteImageInArchiveRequest'
import { responseDealings } from '@utils/data/responseDealings'
import { IRefetchBoxes } from '../types/IRefetchBoxes'
import { IResolveEvent } from '../types/IResolveEvent'

export async function removeImageInArchive(
  image: IDeleteImageInArchiveRequest,
  refetchBoxes: IRefetchBoxes,
): Promise<IResolveEvent> {
  const response = await deleteImageInArchiveRequest(image)

  const { handledAnswer, error } = await responseDealings<IResolveEvent>({
    response,
    callback: () => removeImageInArchive(image, refetchBoxes),
  })

  if (handledAnswer) {
    await refetchBoxes()
  }

  return {
    resolved: handledAnswer,
    error,
  }
}
