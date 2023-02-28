import { updateBookRequest } from '@api/booksRequests'
import { IUpdateBookRequest } from '@api/booksRequests/types/IUpdateBookRequest'
import { IBooksResponse } from '@api/responsesTypes/IBooksResponse'
import {
  setErrorAction,
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
  if (!bookInfosUpdated) {
    return dispatch(
      setErrorAction({
        title: 'Error ao processar as informações',
        message:
          'Verifique as informações fornecidas e tente novamente. Certifique-se de que todos os campos estão preenchidos corretamente.',
      }),
    )
  }

  const response = await updateBookRequest(bookInfosUpdated)

  if (response.errorMessage === 'Invalid token') {
    const isRefreshed = await refreshSessionFunction()

    if (isRefreshed) {
      return updateBookFunction({ bookInfosUpdated, dispatch })
    } else {
      return
    }
  }

  if (response.errorMessage) {
    return dispatch(
      setErrorAction({
        title: response.errorTitle as string,
        message: response.errorMessage,
      }),
    )
  }

  const book = response.book as IBooksResponse
  dispatch(updateBookAction(book))
}
