import { IShareProjectDTO } from '@api/dtos/IShareProjectDTO'
import { shareProjectRequest } from '@api/projectsRequests'
import { IRefetchProjects } from '@hooks/useProjects/types/IRefetchProjects'
import { IResolveEvent } from '@hooks/useProjects/types/IResolveEvent'
import { responseDealings } from '@utils/data/responseDealings'

export async function shareProject(
  projectId: string,
  shareInfos: IShareProjectDTO,
  refetchProjects: IRefetchProjects,
): Promise<IResolveEvent> {
  const response = await shareProjectRequest(shareInfos, projectId)

  const { handledAnswer, error } = await responseDealings<IResolveEvent>({
    response,
    callback: () => shareProject(projectId, shareInfos, refetchProjects),
  })

  if (handledAnswer) {
    await refetchProjects()
  }

  return {
    resolved: handledAnswer,
    error,
  }
}
