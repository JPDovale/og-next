import { Dispatch } from 'react'
import { deleteSceneRequest } from '../../../../api/booksRequests'
import { IBooksResponse } from '../../../../api/responsesTypes/IBooksResponse'
import { refreshSessionFunction } from '../../../user/functions/refreshSessionFunction'
import { setErrorAction } from '../../../user/reducer/actionsUserReducer'
import { updateBookAction } from '../../reducer/actionsProjectsReducer'

interface IDeleteSceneFunction {
  bookId: string
  capituleId: string
  sceneId: string
  dispatch: Dispatch<any>
}

export async function deleteSceneFunction({
  bookId,
  capituleId,
  sceneId,
  dispatch,
}: IDeleteSceneFunction): Promise<void> {
  if (!bookId || !capituleId || !sceneId) {
    return dispatch(
      setErrorAction({
        title: 'Error ao processar as informações',
        message:
          'Verifique as informações fornecidas e tente novamente. Certifique-se de que todos os campos estão preenchidos corretamente.',
      }),
    )
  }

  const response = await deleteSceneRequest({ bookId, capituleId, sceneId })

  if (response.errorMessage === 'Invalid token') {
    const isRefreshed = await refreshSessionFunction()

    if (isRefreshed) {
      return deleteSceneFunction({ bookId, capituleId, sceneId, dispatch })
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
