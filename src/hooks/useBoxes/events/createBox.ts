import { createBoxRequest } from '@api/boxesRequests'
import { ICreateBoxRequest } from '@api/boxesRequests/types/ICreateBoxRequest'
import { responseDealings } from '@utils/data/responseDealings'
import { IRefetchBoxes } from '../types/IRefetchBoxes'
import { IResolveEvent } from '../types/IResolveEvent'

export async function createBox(
  box: ICreateBoxRequest,
  refetchBoxes: IRefetchBoxes,
): Promise<IResolveEvent> {
  const response = await createBoxRequest(box)

  const { handledAnswer, error } = await responseDealings<IResolveEvent>({
    response,
    callback: () => createBox(box, refetchBoxes),
  })

  if (handledAnswer) {
    await refetchBoxes()
  }

  return {
    resolved: handledAnswer,
    error,
  }
}
