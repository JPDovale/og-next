import { updateBookAction } from '@contexts/projects/reducer/actions/books/updateBookAction'
import { responseDealings } from '@services/responseDealings'
import { Dispatch } from 'react'
import { reorderScenesRequest } from '@api/booksRequests'
import { IBooksResponse } from '@api/responsesTypes/IBooksResponse'
import { setLoadingAction } from '@contexts/projects/reducer/actions/projects/setLoadingAction'

interface IReorderScenesFunction {
  bookId: string
  capituleId: string
  sequenceFrom: string
  sequenceTo: string
  dispatch: Dispatch<any>
}

export async function reorderScenesFunction({
  bookId,
  capituleId,
  sequenceFrom,
  sequenceTo,
  dispatch,
}: IReorderScenesFunction): Promise<boolean> {
  dispatch(setLoadingAction(true))

  const response = await reorderScenesRequest({
    bookId,
    capituleId,
    sequenceFrom,
    sequenceTo,
  })

  const handledAnswer = await responseDealings({
    response,
    dispatch,
    into: 'projects',
    callback: () =>
      reorderScenesFunction({
        dispatch,
        bookId,
        capituleId,
        sequenceFrom,
        sequenceTo,
      }),
  })

  if (handledAnswer === false) return false

  const book = response as IBooksResponse
  dispatch(updateBookAction({ book }))

  return true
}
