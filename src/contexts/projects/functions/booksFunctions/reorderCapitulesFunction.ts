import { Dispatch } from 'react'
import { reorderCapitulesRequest } from '../../../../api/booksRequests'
import { IBooksResponse } from '../../../../api/responsesTypes/IBooksResponse'
import { refreshSessionFunction } from '../../../user/functions/refreshSessionFunction'
import {
  setErrorAction,
  setLoadingAction,
  updateBookAction,
} from '../../reducer/actionsProjectsReducer'

interface IReorderCapitulesFunction {
  bookId: string
  sequenceFrom: string
  sequenceTo: string
  dispatch: Dispatch<any>
}

export async function reorderCapitulesFunction({
  bookId,
  sequenceFrom,
  sequenceTo,
  dispatch,
}: IReorderCapitulesFunction): Promise<void> {
  dispatch(setLoadingAction(true))

  const response = await reorderCapitulesRequest({
    bookId,
    sequenceFrom,
    sequenceTo,
  })

  if (response.errorMessage === 'Invalid token') {
    const isRefreshed = await refreshSessionFunction()

    if (isRefreshed) {
      return reorderCapitulesFunction({
        bookId,
        sequenceFrom,
        sequenceTo,
        dispatch,
      })
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

  const book = response as IBooksResponse
  dispatch(updateBookAction(book))
  dispatch(setLoadingAction(false))
}
