import { addGenreRequest } from '@api/booksRequests'
import { IAddGenreRequest } from '@api/booksRequests/types/IAddGenreRequest'
import { IBooksResponse } from '@api/responsesTypes/IBooksResponse'
import {
  setErrorAction,
  updateBookAction,
} from '@contexts/projects/reducer/actionsProjectsReducer'
import { refreshSessionFunction } from '@contexts/user/functions/refreshSessionFunction'
import { Dispatch } from 'react'

interface IAddGenreFunction {
  genreRequest: IAddGenreRequest
  dispatch: Dispatch<any>
}

export async function addGenreFunction({
  dispatch,
  genreRequest,
}: IAddGenreFunction): Promise<void> {
  if (!genreRequest) {
    return dispatch(
      setErrorAction({
        title: 'Error ao processar as informações',
        message:
          'Verifique as informações fornecidas e tente novamente. Certifique-se de que todos os campos estão preenchidos corretamente.',
      }),
    )
  }

  const response = await addGenreRequest(genreRequest)

  if (response.errorMessage === 'Invalid token') {
    const isRefreshed = await refreshSessionFunction()

    if (isRefreshed) {
      return addGenreFunction({ genreRequest, dispatch })
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
