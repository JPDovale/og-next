import { Dispatch } from 'react'
import { deleteBookRequest } from '../../../../api/booksRequests'
import { refreshSessionFunction } from '../../../user/functions/refreshSessionFunction'
import { setErrorAction } from '../../../user/reducer/actionsUserReducer'
import { deleteBookAction } from '../../reducer/actionsProjectsReducer'

interface IDeleteBookFunction {
  bookId: string
  dispatch: Dispatch<any>
}

export async function deleteBookFunction({
  bookId,
  dispatch,
}: IDeleteBookFunction): Promise<boolean> {
  if (!bookId) {
    dispatch(
      setErrorAction({
        title: 'Error ao processar as informações',
        message:
          'Verifique as informações fornecidas e tente novamente. Certifique-se de que todos os campos estão preenchidos corretamente.',
      }),
    )
    return false
  }

  const response = await deleteBookRequest(bookId)

  if (response.errorMessage === 'Invalid token') {
    const isRefreshed = await refreshSessionFunction()

    if (isRefreshed) {
      return deleteBookFunction({ bookId, dispatch })
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

  dispatch(deleteBookAction(bookId))

  return true
}
