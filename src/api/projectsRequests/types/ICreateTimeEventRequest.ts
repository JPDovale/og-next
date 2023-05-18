import { ICreateTimeEventDTO } from '@api/dtos/timeLinesDTOS/ICreateTimeEventDTO'

export interface ICreateTimeEventRequest {
  projectId: string
  data: ICreateTimeEventDTO
}
