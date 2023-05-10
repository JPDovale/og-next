import { deleteArchiveBoxRequest } from '@api/boxesRequests'
import { IDeleteArchiveBoxRequest } from '@api/boxesRequests/types/IDeleteArchiveBoxRequest'
import { responseDealings } from '@utils/data/responseDealings'
import { IRefetchBoxes } from '../types/IRefetchBoxes'
import { IResolveEvent } from '../types/IResolveEvent'

export async function deleteArchive(
  archive: IDeleteArchiveBoxRequest,
  refetchBoxes: IRefetchBoxes,
): Promise<IResolveEvent> {
  const response = await deleteArchiveBoxRequest(archive)

  const { handledAnswer, error } = await responseDealings<IResolveEvent>({
    response,
    callback: () => deleteArchive(archive, refetchBoxes),
  })

  if (handledAnswer) {
    await refetchBoxes()
  }

  return {
    resolved: handledAnswer,
    error,
  }
}
