import { IBooksResponse } from '@api/responsesTypes/IBooksResponse'
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from 'react-query'

export type IRefetchBook = <TPageData>(
  options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
) => Promise<
  QueryObserverResult<
    | {
        book: IBooksResponse
        errorMessage: string | null
        errorTitle: string | null
      }
    | undefined,
    unknown
  >
>
