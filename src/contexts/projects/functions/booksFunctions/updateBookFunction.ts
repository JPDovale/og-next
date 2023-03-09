import { updateBookRequest } from '@api/booksRequests'
import { IUpdateBookRequest } from '@api/booksRequests/types/IUpdateBookRequest'
import { IBooksResponse } from '@api/responsesTypes/IBooksResponse'
import {
  setErrorAction,
  setLoadingAction,
  updateBookAction,
} from '@contexts/projects/reducer/actionsProjectsReducer'
import { refreshSessionFunction } from '@contexts/user/functions/refreshSessionFunction'
import { Dispatch } from 'react'

interface IUpdateBookFunction {
  bookInfosUpdated: IUpdateBookRequest
  dispatch: Dispatch<any>
}

export async function updateBookFunction({
  bookInfosUpdated,
  dispatch,
}: IUpdateBookFunction): Promise<void> {
  dispatch(setLoadingAction(true))

  const response = await updateBookRequest(bookInfosUpdated)

  if (response.errorMessage === 'Invalid token') {
    const isRefreshed = await refreshSessionFunction()

    if (isRefreshed) {
      return updateBookFunction({ bookInfosUpdated, dispatch })
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
