import { removeGenreRequest } from '@api/booksRequests'
import { IRemoveGenreRequest } from '@api/booksRequests/types/IRemoveGenreRequest'
import { IBooksResponse } from '@api/responsesTypes/IBooksResponse'
import {
  setErrorAction,
  setLoadingAction,
  updateBookAction,
} from '@contexts/projects/reducer/actionsProjectsReducer'
import { refreshSessionFunction } from '@contexts/user/functions/refreshSessionFunction'
import { Dispatch } from 'react'

interface IRemoveGenreFunction {
  genreRequest: IRemoveGenreRequest
  dispatch: Dispatch<any>
}

export async function removeGenreFunction({
  dispatch,
  genreRequest,
}: IRemoveGenreFunction): Promise<void> {
  dispatch(setLoadingAction(true))

  const response = await removeGenreRequest(genreRequest)

  if (response.errorMessage === 'Invalid token') {
    const isRefreshed = await refreshSessionFunction()

    if (isRefreshed) {
      return removeGenreFunction({ genreRequest, dispatch })
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
