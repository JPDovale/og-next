import { ICreateTimeEventDTO } from '@api/dtos/timeLinesDTOS/ICreateTimeEventDTO'
import { createTimeEventRequest } from '@api/projectsRequests'
import { IResolveEvent } from '@hooks/useProjects/types/IResolveEvent'
import { responseDealings } from '@utils/data/responseDealings'
import { IRefetchProject } from '../types/IRefetchProject'

export async function createTimeEventOnMainTimeLien(
  projectId: string,
  newTimeEvent: ICreateTimeEventDTO,
  refetchProject: IRefetchProject,
): Promise<IResolveEvent> {
  const response = await createTimeEventRequest({
    projectId,
    data: newTimeEvent,
  })

  const { handledAnswer, error } = await responseDealings<IResolveEvent>({
    response,
    callback: () =>
      createTimeEventOnMainTimeLien(projectId, newTimeEvent, refetchProject),
  })

  if (handledAnswer) {
    await refetchProject()
  }

  return {
    resolved: handledAnswer,
    error,
  }
}
