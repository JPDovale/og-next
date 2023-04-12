import { updateBookAction } from '@contexts/projects/reducer/actions/books/updateBookAction'
import { responseDealings } from '@services/responseDealings'
import { Dispatch } from 'react'
import { removeFrontCoverRequest } from '@api/booksRequests'
import { IBooksResponse } from '@api/responsesTypes/IBooksResponse'
import { setLoadingAction } from '@contexts/projects/reducer/actions/projects/setLoadingAction'

interface IRemoveFrontCoverFunction {
  bookId: string
  dispatch: Dispatch<any>
}

export async function removeFrontCoverFunction({
  bookId,
  dispatch,
}: IRemoveFrontCoverFunction): Promise<boolean> {
  dispatch(setLoadingAction(true))

  const response = await removeFrontCoverRequest(bookId)

  const handledAnswer = await responseDealings({
    response,
    dispatch,
    into: 'projects',
    callback: () => removeFrontCoverFunction({ dispatch, bookId }),
  })

  if (handledAnswer === false) return false

  const book = response as IBooksResponse

  dispatch(updateBookAction({ book }))

  return true
}
