import { removeGenreRequest } from '@api/booksRequests'
import { IRemoveGenreRequest } from '@api/booksRequests/types/IRemoveGenreRequest'
import { IBooksResponse } from '@api/responsesTypes/IBooksResponse'
import { updateBookAction } from '@contexts/projects/reducer/actions/books/updateBookAction'
import { setLoadingAction } from '@contexts/projects/reducer/actions/projects/setLoadingAction'
import { responseDealings } from '@services/responseDealings'
import { Dispatch } from 'react'

interface IRemoveGenreFunction {
  genreRequest: IRemoveGenreRequest
  dispatch: Dispatch<any>
}

export async function removeGenreFunction({
  dispatch,
  genreRequest,
}: IRemoveGenreFunction): Promise<boolean> {
  dispatch(setLoadingAction(true))

  const response = await removeGenreRequest(genreRequest)

  const handledAnswer = await responseDealings({
    response,
    dispatch,
    into: 'projects',
    callback: () => removeGenreFunction({ dispatch, genreRequest }),
  })

  if (handledAnswer === false) return false

  const book = response.book as IBooksResponse

  dispatch(updateBookAction({ book }))

  return true
}
