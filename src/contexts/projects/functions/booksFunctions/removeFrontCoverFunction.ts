import { Dispatch } from 'react'
import { removeFrontCoverRequest } from '../../../../api/booksRequests'
import { IBooksResponse } from '../../../../api/responsesTypes/IBooksResponse'
import { refreshSessionFunction } from '../../../user/functions/refreshSessionFunction'
import {
  setErrorAction,
  setLoadingAction,
  updateBookAction,
} from '../../reducer/actionsProjectsReducer'

interface IRemoveFrontCoverFunction {
  bookId: string
  dispatch: Dispatch<any>
}

export async function removeFrontCoverFunction({
  bookId,
  dispatch,
}: IRemoveFrontCoverFunction): Promise<void> {
  dispatch(setLoadingAction(true))

  const response = await removeFrontCoverRequest(bookId)

  if (response.errorMessage === 'Invalid token') {
    const isRefreshed = await refreshSessionFunction()

    if (isRefreshed) {
      return removeFrontCoverFunction({ bookId, dispatch })
    } else {
      dispatch(setLoadingAction(false))

      return
    }
  }

  if (response.errorMessage) {
    dispatch(setLoadingAction(false))

    dispatch(
      setErrorAction({
        title: response.errorTitle,
        message: response.errorMessage,
      }),
    )
    return
  }

  const bookUpdated = response as IBooksResponse
  dispatch(setLoadingAction(false))
  dispatch(updateBookAction(bookUpdated))
}
