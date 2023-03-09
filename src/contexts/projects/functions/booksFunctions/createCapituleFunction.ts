import { Dispatch } from 'react'
import { createCapituleRequest } from '../../../../api/booksRequests'
import { ICreateCapituleRequest } from '../../../../api/booksRequests/types/ICreateCapituleRequest'
import { IBooksResponse } from '../../../../api/responsesTypes/IBooksResponse'
import { refreshSessionFunction } from '../../../user/functions/refreshSessionFunction'
import {
  setErrorAction,
  setLoadingAction,
  updateBookAction,
} from '../../reducer/actionsProjectsReducer'

interface ICreateCapituleFunction {
  newCapitule: ICreateCapituleRequest
  dispatch: Dispatch<any>
}

export async function createCapituleFunction({
  dispatch,
  newCapitule,
}: ICreateCapituleFunction): Promise<boolean> {
  dispatch(setLoadingAction(true))

  const response = await createCapituleRequest(newCapitule)

  if (response.errorMessage === 'Invalid token') {
    const isRefreshed = await refreshSessionFunction()

    if (isRefreshed) {
      return createCapituleFunction({ newCapitule, dispatch })
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
