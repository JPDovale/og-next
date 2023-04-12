import { updateBookAction } from '@contexts/projects/reducer/actions/books/updateBookAction'
import { responseDealings } from '@services/responseDealings'
import { Dispatch } from 'react'
import { deleteCapituleRequest } from '../../../../api/booksRequests'
import { IBooksResponse } from '../../../../api/responsesTypes/IBooksResponse'
import { setLoadingAction } from '@contexts/projects/reducer/actions/projects/setLoadingAction'

interface IDeleteCapituleFunction {
  bookId: string
  capituleId: string
  dispatch: Dispatch<any>
}

export async function deleteCapituleFunction({
  bookId,
  capituleId,
  dispatch,
}: IDeleteCapituleFunction): Promise<boolean> {
  dispatch(setLoadingAction(true))

  const response = await deleteCapituleRequest({ bookId, capituleId })

  const handledAnswer = await responseDealings({
    response,
    dispatch,
    into: 'projects',
    callback: () => deleteCapituleFunction({ dispatch, bookId, capituleId }),
  })

  if (handledAnswer === false) return false

  const book = response as IBooksResponse

  dispatch(updateBookAction({ book }))

  return true
}
