import { ICreateProjectDTO } from '@api/dtos/ICreateProjectDTO'
import { createProjectRequest } from '@api/projectsRequests'
import { IProjectResponse } from '@api/responsesTypes/IProjectResponse'
import { responseDealings } from '@utils/data/responseDealings'
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from 'react-query'
import { IResolveEvent } from '../types/IResolveEvent'

export async function createProject(
  newProject: ICreateProjectDTO,
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
  const response = await createProjectRequest(newProject)

  const { handledAnswer, error } = await responseDealings<IResolveEvent>({
    response,
    callback: () => createProject(newProject, refetchProjects, setLoading),
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
