import { updateBookRequest } from '@api/booksRequests'
import { IUpdateBookRequest } from '@api/booksRequests/types/IUpdateBookRequest'
import { IBooksResponse } from '@api/responsesTypes/IBooksResponse'
import { updateBookAction } from '@contexts/projects/reducer/actions/books/updateBookAction'
import { setLoadingAction } from '@contexts/projects/reducer/actions/projects/setLoadingAction'
import { responseDealings } from '@services/responseDealings'
import { Dispatch } from 'react'

interface IUpdateBookFunction {
  bookInfosUpdated: IUpdateBookRequest
  dispatch: Dispatch<any>
}

export async function updateBookFunction({
  bookInfosUpdated,
  dispatch,
}: IUpdateBookFunction): Promise<boolean> {
  dispatch(setLoadingAction(true))

  const response = await updateBookRequest(bookInfosUpdated)

  const handledAnswer = await responseDealings({
    response,
    dispatch,
    into: 'projects',
    callback: () =>
      updateBookFunction({
        dispatch,
        bookInfosUpdated,
      }),
  })

  if (handledAnswer === false) return false

  const book = response.book as IBooksResponse

  dispatch(updateBookAction({ book }))

  return true
}
