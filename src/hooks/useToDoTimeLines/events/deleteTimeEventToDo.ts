import { deleteTimeEventToDoRequest } from '@api/timeLinesRequests'
import { responseDealings } from '@utils/data/responseDealings'
import { IRefetchToDoTimeLines } from '../types/IRefetchToDoTimeLines'
import { IResolveEvent } from '../types/IResolveEvent'

export async function deleteToDoTimeEvent(
  timeLineId: string,
  timeEventId: string,
  refetchToDoTimeLines: IRefetchToDoTimeLines,
): Promise<IResolveEvent> {
  const response = await deleteTimeEventToDoRequest(timeLineId, timeEventId)

  const { handledAnswer, error } = await responseDealings<IResolveEvent>({
    response,
    callback: () =>
      deleteToDoTimeEvent(timeLineId, timeEventId, refetchToDoTimeLines),
  })

  if (handledAnswer) {
    await refetchToDoTimeLines()
  }

  return {
    resolved: handledAnswer,
    error,
  }
}
