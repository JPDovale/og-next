import { deleteBookAction } from '@contexts/projects/reducer/actions/books/deleteBookAction'
import { responseDealings } from '@services/responseDealings'
import { Dispatch } from 'react'
import { deleteBookRequest } from '../../../../api/booksRequests'
import { setLoadingAction } from '@contexts/projects/reducer/actions/projects/setLoadingAction'

interface IDeleteBookFunction {
  bookId: string
  dispatch: Dispatch<any>
}

export async function deleteBookFunction({
  bookId,
  dispatch,
}: IDeleteBookFunction): Promise<boolean> {
  dispatch(setLoadingAction(true))

  const response = await deleteBookRequest(bookId)

  const handledAnswer = await responseDealings({
    response,
    dispatch,
    into: 'projects',
    callback: () => deleteBookFunction({ dispatch, bookId }),
  })

  if (handledAnswer === false) return false

  dispatch(deleteBookAction({ bookId }))

  return true
}
