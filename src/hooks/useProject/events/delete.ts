import { deleteProjectRequest } from '@api/projectsRequests'
import { IProjectResponse } from '@api/responsesTypes/IProjectResponse'
import { IResolveEvent } from '@hooks/useProjects/types/IResolveEvent'
import { responseDealings } from '@utils/data/responseDealings'
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from 'react-query'

export async function deleteProject(
  projectId: string,
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
  const response = await deleteProjectRequest(projectId)

  const { handledAnswer, error } = await responseDealings<IResolveEvent>({
    response,
    callback: () => deleteProject(projectId, refetchProjects),
  })

  if (handledAnswer) {
    refetchProjects()
  }

  return {
    resolved: handledAnswer,
    error,
  }
}
