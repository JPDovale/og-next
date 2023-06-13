import { IBook } from '@api/responsesTypes/book/IBook'
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
        book: IBook
        errorMessage: string | null
        errorTitle: string | null
      }
    | undefined,
    unknown
  >
>
