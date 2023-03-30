import { updateBookAction } from '@contexts/projects/reducer/actions/books/updateBookAction'
import { responseDealings } from '@services/responseDealings'
import { Dispatch } from 'react'
import { reorderCapitulesRequest } from '@api/booksRequests'
import { IBooksResponse } from '@api/responsesTypes/IBooksResponse'
import { setLoadingAction } from '@contexts/projects/reducer/actions/projects/setLoadingAction'

interface IReorderCapitulesFunction {
  bookId: string
  sequenceFrom: string
  sequenceTo: string
  dispatch: Dispatch<any>
}

export async function reorderCapitulesFunction({
  bookId,
  sequenceFrom,
  sequenceTo,
  dispatch,
}: IReorderCapitulesFunction): Promise<boolean> {
  dispatch(setLoadingAction(true))

  const response = await reorderCapitulesRequest({
    bookId,
    sequenceFrom,
    sequenceTo,
  })

  const handledAnswer = await responseDealings({
    response,
    dispatch,
    into: 'projects',
    callback: () =>
      reorderCapitulesFunction({ dispatch, bookId, sequenceFrom, sequenceTo }),
  })

  if (handledAnswer === false) return false

  const book = response as IBooksResponse

  dispatch(updateBookAction({ book }))

  return true
}
