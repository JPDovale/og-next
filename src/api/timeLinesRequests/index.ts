import { ICreateToDoTimeLineDTO } from '@api/dtos/timeLinesDTOS/ICreateToDoTimeLineDTO'
import { api } from '..'
import { ICreateTimeEventToDoRequest } from './types/ICreateTimeEventToDoRequest'

export async function getToDoTimeLinesRequest() {
  try {
    const response = await api.get('/timelines/todo')
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function createToDoTimeLineRequest(
  newToDoTimeLine: ICreateToDoTimeLineDTO,
) {
  try {
    const response = await api.post('/timelines/todo', newToDoTimeLine)
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function createTimeEventToDoRequest({
  newTimeEventToDo,
  timeLineId,
}: ICreateTimeEventToDoRequest) {
  try {
    const response = await api.post(
      `/timelines/todo/${timeLineId}/timeEvents`,
      newTimeEventToDo,
    )
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}
