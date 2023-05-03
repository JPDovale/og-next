import { IShareProjectDTO } from '@api/dtos/IShareProjectDTO'
import { shareProjectRequest } from '@api/projectsRequests'
import { IProjectResponse } from '@api/responsesTypes/IProjectResponse'
import { IResolveEvent } from '@hooks/useProjects/types/IResolveEvent'
import { responseDealings } from '@utils/data/responseDealings'
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from 'react-query'

export async function shareProject(
  projectId: string,
  shareInfos: IShareProjectDTO,
  refetchProjects: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
  ) => Promise<
    QueryObserverResult<
      {
        projects: IProjectResponse[]
        errorMessage: string | null
        errorTitle: string | null
      },
      unknown
    >
  >,
): Promise<IResolveEvent> {
  const response = await shareProjectRequest(shareInfos, projectId)

  const { handledAnswer, error } = await responseDealings<IResolveEvent>({
    response,
    callback: () => shareProject(projectId, shareInfos, refetchProjects),
  })

  if (handledAnswer) {
    refetchProjects()
  }

  return {
    resolved: handledAnswer,
    error,
  }
}
