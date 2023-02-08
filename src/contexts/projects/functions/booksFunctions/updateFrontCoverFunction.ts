import { Dispatch } from 'react'
import { updateFrontCoverRequest } from '../../../../api/booksRequests'
import { IBooksResponse } from '../../../../api/responsesTypes/IBooksResponse'
import { refreshSessionFunction } from '../../../user/functions/refreshSessionFunction'
import {
  setErrorAction,
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
  if (!file || !bookId) {
    return dispatch(
      setErrorAction({
        title: 'Imagem não alterada',
        message:
          'Verifique as informações fornecidas e tente novamente. Certifique-se de que todos os campos estão preenchidos corretamente.',
      }),
    )
  }

  const response = await updateFrontCoverRequest({ bookId, file })

  if (response.errorMessage === 'Invalid token') {
    const isRefreshed = await refreshSessionFunction()

    if (isRefreshed) {
      return updateFrontCoverFunction({ file, bookId, dispatch })
    }

    return
  }

  if (response.errorMessage) {
    return dispatch(
      setErrorAction({
        title: response.errorTitle,
        message: response.errorMessage,
      }),
    )
  }

  const book = response as IBooksResponse
  dispatch(updateBookAction(book))
}
