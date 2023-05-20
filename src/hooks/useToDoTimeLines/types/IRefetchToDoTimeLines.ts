import { ITimeLineResponse } from '@api/responsesTypes/ITimeLineResponse'
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from 'react-query'

export type IRefetchToDoTimeLines = <TPageData>(
  options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
) => Promise<
  QueryObserverResult<
    {
      toDoTimeLines: ITimeLineResponse[]
      errorMessage: string | null
      errorTitle: string | null
    },
    unknown
  >
>
