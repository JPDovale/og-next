import { Dispatch } from 'react'
import { deleteCapituleRequest } from '../../../../api/booksRequests'
import { IBooksResponse } from '../../../../api/responsesTypes/IBooksResponse'
import { refreshSessionFunction } from '../../../user/functions/refreshSessionFunction'
import { setErrorAction } from '../../../user/reducer/actionsUserReducer'
import { updateBookAction } from '../../reducer/actionsProjectsReducer'

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
  if (!bookId || !capituleId) {
    dispatch(
      setErrorAction({
        title: 'Error ao processar as informações',
        message:
          'Verifique as informações fornecidas e tente novamente. Certifique-se de que todos os campos estão preenchidos corretamente.',
      }),
    )
    return false
  }

  const response = await deleteCapituleRequest({ bookId, capituleId })

  if (response.errorMessage === 'Invalid token') {
    const isRefreshed = await refreshSessionFunction()

    if (isRefreshed) {
      return deleteCapituleFunction({ bookId, capituleId, dispatch })
    } else {
      return false
    }
  }

  if (response.errorMessage) {
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

  return true
}
