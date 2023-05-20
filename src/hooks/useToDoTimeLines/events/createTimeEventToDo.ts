import { ICreateTimeEventToDoDTO } from '@api/dtos/timeLinesDTOS/ICreateTimeEventToDoDTO'
import { createTimeEventToDoRequest } from '@api/timeLinesRequests'
import { responseDealings } from '@utils/data/responseDealings'
import { IRefetchToDoTimeLines } from '../types/IRefetchToDoTimeLines'
import { IResolveEvent } from '../types/IResolveEvent'

export async function createTimeEventToDo(
  timeLineId: string,
  newTimeEventToDo: ICreateTimeEventToDoDTO,
  refetchToDoTimeLines: IRefetchToDoTimeLines,
): Promise<IResolveEvent> {
  const response = await createTimeEventToDoRequest({
    timeLineId,
    newTimeEventToDo,
  })

  const { handledAnswer, error } = await responseDealings<IResolveEvent>({
    response,
    callback: () =>
      createTimeEventToDo(timeLineId, newTimeEventToDo, refetchToDoTimeLines),
  })

  if (handledAnswer) {
    await refetchToDoTimeLines()
  }

  return {
    resolved: handledAnswer,
    error,
  }
}
