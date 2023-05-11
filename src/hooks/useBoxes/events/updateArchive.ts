import { updateArchiveRequest } from '@api/boxesRequests'
import { IUpdateArchiveRequest } from '@api/boxesRequests/types/IUpdateArchiveRequest'
import { responseDealings } from '@utils/data/responseDealings'
import { IRefetchBoxes } from '../types/IRefetchBoxes'
import { IResolveEvent } from '../types/IResolveEvent'

export async function updateArchive(
  archive: IUpdateArchiveRequest,
  refetchBoxes: IRefetchBoxes,
): Promise<IResolveEvent> {
  const response = await updateArchiveRequest(archive)

  const { handledAnswer, error } = await responseDealings<IResolveEvent>({
    response,
    callback: () => updateArchive(archive, refetchBoxes),
  })

  if (handledAnswer) {
    await refetchBoxes()
  }

  return {
    resolved: handledAnswer,
    error,
  }
}
