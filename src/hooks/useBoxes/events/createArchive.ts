import { createArchiveInBoxRequest } from '@api/boxesRequests'
import { ICreateArchiveInBoxRequest } from '@api/boxesRequests/types/ICreateArchiveInBoxRequest'
import { responseDealings } from '@utils/data/responseDealings'
import { IRefetchBoxes } from '../types/IRefetchBoxes'
import { IResolveEvent } from '../types/IResolveEvent'

export async function createArchive(
  archive: ICreateArchiveInBoxRequest,
  refetchBoxes: IRefetchBoxes,
): Promise<IResolveEvent> {
  const response = await createArchiveInBoxRequest(archive)

  const { handledAnswer, error } = await responseDealings<IResolveEvent>({
    response,
    callback: () => createArchive(archive, refetchBoxes),
  })

  if (handledAnswer) {
    await refetchBoxes()
  }

  return {
    resolved: handledAnswer,
    error,
  }
}
