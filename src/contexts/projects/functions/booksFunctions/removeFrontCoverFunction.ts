import { Dispatch } from 'react'
import { removeFrontCoverRequest } from '../../../../api/booksRequests'
import { IBooksResponse } from '../../../../api/responsesTypes/IBooksResponse'
import { refreshSessionFunction } from '../../../user/functions/refreshSessionFunction'
import {
  setErrorAction,
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
  if (!bookId) {
    return dispatch(
      setErrorAction({
        title: 'Error ao processar as informações',
        message:
          'Verifique as informações fornecidas e tente novamente. Certifique-se de que todos os campos estão preenchidos corretamente.',
      }),
    )
  }

  const response = await removeFrontCoverRequest(bookId)

  if (response.errorMessage === 'Invalid token') {
    const isRefreshed = await refreshSessionFunction()

    if (isRefreshed) {
      return removeFrontCoverFunction({ bookId, dispatch })
    }
  }

  if (response.errorMessage) {
    return dispatch(
      setErrorAction({
        title: response.errorTitle,
        message: response.errorMessage,
      }),
    )
  }

  const bookUpdated = response as IBooksResponse
  dispatch(updateBookAction(bookUpdated))
}
