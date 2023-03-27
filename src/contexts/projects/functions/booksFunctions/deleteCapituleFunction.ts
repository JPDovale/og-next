import { Dispatch } from 'react'
import { deleteCapituleRequest } from '../../../../api/booksRequests'
import { IBooksResponse } from '../../../../api/responsesTypes/IBooksResponse'
import { refreshSessionFunction } from '../../../user/functions/refreshSessionFunction'
import { setErrorAction } from '../../../user/reducer/actionsUserReducer'
import {
  setLoadingAction,
  updateBookAction,
} from '../../reducer/actionsProjectsReducer'

interface IDeleteCapituleFunction {
  bookId: string
  capituleId: string
  dispatch: Dispatch<any>
}

export async function deleteCapituleFunction({
  bookId,
  capituleId,
  dispatch,
}: IDeleteCapituleFunction): Promise<boolean> {
  dispatch(setLoadingAction(true))

  const response = await deleteCapituleRequest({ bookId, capituleId })

  if (response.errorMessage === 'Invalid token') {
    const isRefreshed = await refreshSessionFunction()

    if (isRefreshed) {
      return deleteCapituleFunction({ bookId, capituleId, dispatch })
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

  const book = response as IBooksResponse
  dispatch(updateBookAction(book))
  dispatch(setLoadingAction(false))

  return true
}
