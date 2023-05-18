import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from 'react-query'
import { IProjectPreview } from '../entities/IProjectPreview'

export type IRefetchProjects = <TPageData>(
  options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
) => Promise<
  QueryObserverResult<
    {
      projects: IProjectPreview[]
      errorMessage: string | null
      errorTitle: string | null
    },
    unknown
  >
>
