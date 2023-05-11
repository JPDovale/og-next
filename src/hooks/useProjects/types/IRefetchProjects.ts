import { IProjectResponse } from '@api/responsesTypes/IProjectResponse'
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from 'react-query'

export type IRefetchProjects = <TPageData>(
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
>
