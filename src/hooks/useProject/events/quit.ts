import { quitProjectRequest } from '@api/projectsRequests'
import { IProjectResponse } from '@api/responsesTypes/IProjectResponse'
import { IResolveEvent } from '@hooks/useProjects/types/IResolveEvent'
import { responseDealings } from '@utils/data/responseDealings'
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from 'react-query'

export async function quitProject(
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
  setLoading: (newState: boolean) => void,
): Promise<IResolveEvent> {
  setLoading(true)
  const response = await quitProjectRequest({ projectId })

  const { handledAnswer, error } = await responseDealings<IResolveEvent>({
    response,
    callback: () => quitProject(projectId, refetchProjects, setLoading),
  })

  if (handledAnswer) {
    refetchProjects()
  }

  setLoading(false)
  return {
    resolved: handledAnswer,
    error,
  }
}
