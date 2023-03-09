import { Dispatch } from 'react'
import { updateFrontCoverRequest } from '../../../../api/booksRequests'
import { IBooksResponse } from '../../../../api/responsesTypes/IBooksResponse'
import { refreshSessionFunction } from '../../../user/functions/refreshSessionFunction'
import {
  setErrorAction,
  setLoadingAction,
  updateBookAction,
} from '../../reducer/actionsProjectsReducer'

export interface IUpdateFrontCoverFunction {
  file: File
  bookId: string
  dispatch: Dispatch<any>
}

export async function updateFrontCoverFunction({
  bookId,
  dispatch,
  file,
}: IUpdateFrontCoverFunction): Promise<void> {
  dispatch(setLoadingAction(true))

  const response = await updateFrontCoverRequest({ bookId, file })

  if (response.errorMessage === 'Invalid token') {
    const isRefreshed = await refreshSessionFunction()

    if (isRefreshed) {
      return updateFrontCoverFunction({ file, bookId, dispatch })
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

  const book = response as IBooksResponse
  dispatch(updateBookAction(book))
  dispatch(setLoadingAction(false))
}
