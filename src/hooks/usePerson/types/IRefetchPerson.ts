import { IPerson } from '@api/responsesTypes/person/IPerson'
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
        person: IPerson
        errorMessage: string | null
        errorTitle: string | null
      }
    | undefined,
    unknown
  >
>
