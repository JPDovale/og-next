import { IBoxResponse } from '@api/responsesTypes/IBoxResponse'
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from 'react-query'

export type IRefetchBoxes = <TPageData>(
  options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
) => Promise<
  QueryObserverResult<
    | {
        boxes: IBoxResponse[]
        errorMessage: string | null
        errorTitle: string | null
      }
    | undefined,
    unknown
  >
>
