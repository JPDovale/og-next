import { addGenreRequest } from '@api/booksRequests'
import { IAddGenreRequest } from '@api/booksRequests/types/IAddGenreRequest'
import { IBooksResponse } from '@api/responsesTypes/IBooksResponse'
import {
  setErrorAction,
  setLoadingAction,
  updateBookAction,
} from '@contexts/projects/reducer/actionsProjectsReducer'
import { refreshSessionFunction } from '@contexts/user/functions/refreshSessionFunction'
import { Dispatch } from 'react'

interface IAddGenreFunction {
  genreRequest: IAddGenreRequest
  dispatch: Dispatch<any>
}

export async function addGenreFunction({
  dispatch,
  genreRequest,
}: IAddGenreFunction): Promise<void> {
  dispatch(setLoadingAction(true))

  const response = await addGenreRequest(genreRequest)

  if (response.errorMessage === 'Invalid token') {
    const isRefreshed = await refreshSessionFunction()

    if (isRefreshed) {
      return addGenreFunction({ genreRequest, dispatch })
    } else {
      dispatch(setLoadingAction(false))

      return
    }
  }

  if (response.errorMessage) {
    dispatch(setLoadingAction(false))

    dispatch(
      setErrorAction({
        title: response.errorTitle as string,
        message: response.errorMessage,
      }),
    )

    return
  }

  const book = response.book as IBooksResponse

  dispatch(updateBookAction(book))
  dispatch(setLoadingAction(false))
}
