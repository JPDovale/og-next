import { IPersonsResponse } from '@api/responsesTypes/IPersonsResponse'
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from 'react-query'

export type IRefetchPerson = <TPageData>(
  options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
) => Promise<
  QueryObserverResult<
    | {
        person: IPersonsResponse
        errorMessage: string | null
        errorTitle: string | null
      }
    | undefined,
    unknown
  >
>
