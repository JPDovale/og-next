import { ICreateToDoTimeLineDTO } from '@api/dtos/timeLinesDTOS/ICreateToDoTimeLineDTO'
import { createToDoTimeLineRequest } from '@api/timeLinesRequests'
import { responseDealings } from '@utils/data/responseDealings'
import { IRefetchToDoTimeLines } from '../types/IRefetchToDoTimeLines'
import { IResolveEvent } from '../types/IResolveEvent'

export async function createToDoTimeLine(
  newToDoTimeLine: ICreateToDoTimeLineDTO,
  refetchToDoTimeLines: IRefetchToDoTimeLines,
): Promise<IResolveEvent> {
  const response = await createToDoTimeLineRequest(newToDoTimeLine)

  const { handledAnswer, error } = await responseDealings<IResolveEvent>({
    response,
    callback: () => createToDoTimeLine(newToDoTimeLine, refetchToDoTimeLines),
  })

  if (handledAnswer) {
    await refetchToDoTimeLines()
  }

  return {
    resolved: handledAnswer,
    error,
  }
}
