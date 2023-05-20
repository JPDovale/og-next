import { ICreateTimeEventToDoDTO } from '@api/dtos/timeLinesDTOS/ICreateTimeEventToDoDTO'
import { ICreateToDoTimeLineDTO } from '@api/dtos/timeLinesDTOS/ICreateToDoTimeLineDTO'
import { IResolveEvent } from './IResolveEvent'

export interface ICallEvent {
  createToDoTimeLine: (
    newToDoTimeLine: ICreateToDoTimeLineDTO,
  ) => Promise<IResolveEvent>
  createToDoTimeEvent: (
    timeLineId: string,
    newTimeEventToDo: ICreateTimeEventToDoDTO,
  ) => Promise<IResolveEvent>
}
