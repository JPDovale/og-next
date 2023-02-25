import { Dispatch } from 'react'
import { reorderCapitulesRequest } from '../../../../api/booksRequests'
import { IBooksResponse } from '../../../../api/responsesTypes/IBooksResponse'
import { refreshSessionFunction } from '../../../user/functions/refreshSessionFunction'
import {
  setErrorAction,
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
  if (!bookId || !sequenceFrom || !sequenceTo) {
    return dispatch(
      setErrorAction({
        title: 'Error ao processar as informações',
        message:
          'Verifique as informações fornecidas e tente novamente. Certifique-se de que todos os campos estão preenchidos corretamente.',
      }),
    )
  }

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

  const book = response as IBooksResponse
  dispatch(updateBookAction(book))
}
