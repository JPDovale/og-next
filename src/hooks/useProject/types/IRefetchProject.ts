import { IProject } from '@api/responsesTypes/project/IProject'
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
        project: IProject
        errorMessage: string | null
        errorTitle: string | null
      }
    | undefined,
    unknown
  >
>
