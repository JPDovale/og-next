import { IProjectResponse } from '@api/responsesTypes/IProjectResponse'
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from 'react-query'

export type IRefetchProject = <TPageData>(
  options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
) => Promise<
  QueryObserverResult<
    | {
        project: IProjectResponse
        errorMessage: string | null
        errorTitle: string | null
      }
    | undefined,
    unknown
  >
>
