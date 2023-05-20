import { changeDoneToDoEventRequest } from '@api/projectsRequests'
import { IResolveEvent } from '@hooks/useProjects/types/IResolveEvent'
import { responseDealings } from '@utils/data/responseDealings'
import { IRefetchProject } from '../types/IRefetchProject'

export async function changeDoneTimeEvent(
  projectId: string,
  timeLineId: string,
  timeEventId: string,
  refetchProject: IRefetchProject,
): Promise<IResolveEvent> {
  const response = await changeDoneToDoEventRequest({
    projectId,
    timeLineId,
    timeEventId,
  })

  const { handledAnswer, error } = await responseDealings<IResolveEvent>({
    response,
    callback: () =>
      changeDoneTimeEvent(projectId, timeLineId, timeEventId, refetchProject),
  })

  if (handledAnswer) {
    await refetchProject()
  }

  return {
    resolved: handledAnswer,
    error,
  }
}
