import { deleteBoxRequest } from '@api/boxesRequests'
import { responseDealings } from '@utils/data/responseDealings'
import { IRefetchBoxes } from '../types/IRefetchBoxes'
import { IResolveEvent } from '../types/IResolveEvent'

export async function deleteBox(
  boxId: string,
  refetchBoxes: IRefetchBoxes,
): Promise<IResolveEvent> {
  const response = await deleteBoxRequest(boxId)

  const { handledAnswer, error } = await responseDealings<IResolveEvent>({
    response,
    callback: () => deleteBox(boxId, refetchBoxes),
  })

  if (handledAnswer) {
    await refetchBoxes()
  }

  return {
    resolved: handledAnswer,
    error,
  }
}
