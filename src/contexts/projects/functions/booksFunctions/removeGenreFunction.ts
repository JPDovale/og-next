import { removeGenreRequest } from '@api/booksRequests'
import { IRemoveGenreRequest } from '@api/booksRequests/types/IRemoveGenreRequest'
import { IBooksResponse } from '@api/responsesTypes/IBooksResponse'
import {
  setErrorAction,
  updateBookAction,
} from '@contexts/projects/reducer/actionsProjectsReducer'
import { refreshSessionFunction } from '@contexts/user/functions/refreshSessionFunction'
import { Dispatch } from 'react'

interface IRemoveGenreFunction {
  genreRequest: IRemoveGenreRequest
  dispatch: Dispatch<any>
}

export async function removeGenreFunction({
  dispatch,
  genreRequest,
}: IRemoveGenreFunction): Promise<void> {
  if (!genreRequest) {
    return dispatch(
      setErrorAction({
        title: 'Error ao processar as informações',
        message:
          'Verifique as informações fornecidas e tente novamente. Certifique-se de que todos os campos estão preenchidos corretamente.',
      }),
    )
  }

  const response = await removeGenreRequest(genreRequest)

  if (response.errorMessage === 'Invalid token') {
    const isRefreshed = await refreshSessionFunction()

    if (isRefreshed) {
      return removeGenreFunction({ genreRequest, dispatch })
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
