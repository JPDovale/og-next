import { Dispatch } from 'react'
import { deleteBookRequest } from '../../../../api/booksRequests'
import { refreshSessionFunction } from '../../../user/functions/refreshSessionFunction'
import { setErrorAction } from '../../../user/reducer/actionsUserReducer'
import {
  deleteBookAction,
  setLoadingAction,
} from '../../reducer/actionsProjectsReducer'

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

  if (response.errorMessage === 'Invalid token') {
    const isRefreshed = await refreshSessionFunction()

    if (isRefreshed) {
      return deleteBookFunction({ bookId, dispatch })
    } else {
      dispatch(setLoadingAction(false))

      return false
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

    return false
  }

  dispatch(deleteBookAction(bookId))
  dispatch(setLoadingAction(false))

  return true
}
