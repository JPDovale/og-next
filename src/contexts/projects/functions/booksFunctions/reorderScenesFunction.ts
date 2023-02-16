import { Dispatch } from 'react'
import { reorderScenesRequest } from '../../../../api/booksRequests'
import { IBooksResponse } from '../../../../api/responsesTypes/IBooksResponse'
import { refreshSessionFunction } from '../../../user/functions/refreshSessionFunction'
import {
  setErrorAction,
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
  if (!bookId || !capituleId || !sequenceFrom || !sequenceTo) {
    return dispatch(
      setErrorAction({
        title: 'Error ao processar as informações',
        message:
          'Verifique as informações fornecidas e tente novamente. Certifique-se de que todos os campos estão preenchidos corretamente.',
      }),
    )
  }

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
