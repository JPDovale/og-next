import { Dispatch } from 'react'
import { updateFrontCoverRequest } from '@api/booksRequests'
import { IBooksResponse } from '@api/responsesTypes/IBooksResponse'
import { setLoadingAction } from '@contexts/projects/reducer/actions/projects/setLoadingAction'
import { responseDealings } from '@services/responseDealings'
import { updateBookAction } from '@contexts/projects/reducer/actions/books/updateBookAction'

export interface IUpdateFrontCoverFunction {
  file: File
  bookId: string
  dispatch: Dispatch<any>
}

export async function updateFrontCoverFunction({
  bookId,
  dispatch,
  file,
}: IUpdateFrontCoverFunction): Promise<boolean> {
  dispatch(setLoadingAction(true))

  const response = await updateFrontCoverRequest({ bookId, file })

  const handledAnswer = await responseDealings({
    response,
    dispatch,
    into: 'projects',
    callback: () =>
      updateFrontCoverFunction({
        dispatch,
        bookId,
        file,
      }),
  })

  if (handledAnswer === false) return false

  const book = response as IBooksResponse

  dispatch(updateBookAction({ book }))

  return true
}
