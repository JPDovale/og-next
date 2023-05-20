import { ICreateTimeEventToDoDTO } from '@api/dtos/timeLinesDTOS/ICreateTimeEventToDoDTO'

export interface ICreateTimeEventToDoRequest {
  timeLineId: string
  newTimeEventToDo: ICreateTimeEventToDoDTO
}
