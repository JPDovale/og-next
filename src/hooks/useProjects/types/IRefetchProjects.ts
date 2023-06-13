import { IProjectPreview } from '@api/responsesTypes/project/IProjectPreview'
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
      projects: IProjectPreview[]
      errorMessage: string | null
      errorTitle: string | null
    },
    unknown
  >
>
