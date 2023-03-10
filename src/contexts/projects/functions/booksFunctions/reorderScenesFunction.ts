import { Dispatch } from 'react'
import { reorderScenesRequest } from '../../../../api/booksRequests'
import { IBooksResponse } from '../../../../api/responsesTypes/IBooksResponse'
import { refreshSessionFunction } from '../../../user/functions/refreshSessionFunction'
import {
  setErrorAction,
  setLoadingAction,
  updateBookAction,
} from '../../reducer/actionsProjectsReducer'

interface IReorderScenesFunction {
  bookId: string
  capituleId: string
  sequenceFrom: string
  sequenceTo: string
  dispatch: Dispatch<any>
}

export async function reorderScenesFunction({
  bookId,
  capituleId,
  sequenceFrom,
  sequenceTo,
  dispatch,
}: IReorderScenesFunction): Promise<void> {
  dispatch(setLoadingAction(true))

  const response = await reorderScenesRequest({
    bookId,
    capituleId,
    sequenceFrom,
    sequenceTo,
  })

  if (response.errorMessage === 'Invalid token') {
    const isRefreshed = await refreshSessionFunction()

    if (isRefreshed) {
      return reorderScenesFunction({
        bookId,
        capituleId,
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
