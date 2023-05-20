import { copyTimeLineToProjectRequest } from '@api/projectsRequests'
import { IResolveEvent } from '@hooks/useProjects/types/IResolveEvent'
import { responseDealings } from '@utils/data/responseDealings'
import { IRefetchProject } from '../types/IRefetchProject'

export async function copyTimeLineToProject(
  projectId: string,
  timeLineId: string,
  refetchProject: IRefetchProject,
): Promise<IResolveEvent> {
  const response = await copyTimeLineToProjectRequest(projectId, timeLineId)

  const { handledAnswer, error } = await responseDealings<IResolveEvent>({
    response,
    callback: () =>
      copyTimeLineToProject(projectId, timeLineId, refetchProject),
  })

  if (handledAnswer) {
    await refetchProject()
  }

  return {
    resolved: handledAnswer,
    error,
  }
}
