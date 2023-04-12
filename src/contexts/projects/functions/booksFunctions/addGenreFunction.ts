import { addGenreRequest } from '@api/booksRequests'
import { IAddGenreRequest } from '@api/booksRequests/types/IAddGenreRequest'
import { IBooksResponse } from '@api/responsesTypes/IBooksResponse'
import { updateBookAction } from '@contexts/projects/reducer/actions/books/updateBookAction'
import { setLoadingAction } from '@contexts/projects/reducer/actions/projects/setLoadingAction'
import { responseDealings } from '@services/responseDealings'
import { Dispatch } from 'react'

interface IAddGenreFunction {
  genreRequest: IAddGenreRequest
  dispatch: Dispatch<any>
}

export async function addGenreFunction({
  dispatch,
  genreRequest,
}: IAddGenreFunction): Promise<boolean> {
  dispatch(setLoadingAction(true))

  const response = await addGenreRequest(genreRequest)

  const handledAnswer = await responseDealings({
    response,
    dispatch,
    into: 'projects',
    callback: () => addGenreFunction({ genreRequest, dispatch }),
  })

  if (handledAnswer === false) return false

  const book = response.book as IBooksResponse

  dispatch(updateBookAction({ book }))
  return true
}
