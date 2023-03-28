import { Dispatch } from 'react'
import { deleteSceneRequest } from '../../../../api/booksRequests'
import { IBooksResponse } from '../../../../api/responsesTypes/IBooksResponse'
import { refreshSessionFunction } from '../../../user/functions/refreshSessionFunction'
import { setErrorAction } from '../../../user/reducer/actionsUserReducer'
import {
  setLoadingAction,
  updateBookAction,
} from '../../reducer/actionsProjectsReducer'

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
  dispatch(setLoadingAction(true))

  const response = await deleteSceneRequest({ bookId, capituleId, sceneId })

  if (response.errorMessage === 'Invalid token') {
    const isRefreshed = await refreshSessionFunction()

    if (isRefreshed) {
      return deleteSceneFunction({ bookId, capituleId, sceneId, dispatch })
    } else {
      dispatch(setLoadingAction(false))

      return
    }
  }

  if (response.errorMessage) {
    dispatch(setLoadingAction(false))

    return dispatch(
      setErrorAction({
        title: response.errorTitle as string,
        message: response.errorMessage,
      }),
    )
  }

  const book = response as IBooksResponse
  dispatch(updateBookAction(book))
  dispatch(setLoadingAction(false))
}
