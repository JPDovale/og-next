import { ICapitule } from '@api/responsesTypes/capitule/ICapitule'
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from 'react-query'

export type IRefetchCapitule = <TPageData>(
  options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
) => Promise<
  QueryObserverResult<
    | {
        capitule: ICapitule
        errorMessage: string | null
        errorTitle: string | null
      }
    | undefined,
    unknown
  >
>
