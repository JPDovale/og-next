import { Dispatch } from 'react'
import { updateSceneRequest } from '../../../../api/booksRequests'
import { IUpdateSceneRequest } from '../../../../api/booksRequests/types/IUpdateSceneRequest'
import { IBooksResponse } from '../../../../api/responsesTypes/IBooksResponse'
import { refreshSessionFunction } from '../../../user/functions/refreshSessionFunction'
import {
  setErrorAction,
  setLoadingAction,
  updateBookAction,
} from '../../reducer/actionsProjectsReducer'

interface IUpdateSceneFunction {
  sceneUpdate: IUpdateSceneRequest
  dispatch: Dispatch<any>
}

export async function updateSceneFunction({
  dispatch,
  sceneUpdate,
}: IUpdateSceneFunction): Promise<boolean> {
  dispatch(setLoadingAction(true))

  const response = await updateSceneRequest(sceneUpdate)

  if (response.errorMessage === 'Invalid token') {
    const isRefreshed = await refreshSessionFunction()

    if (isRefreshed) {
      return updateSceneFunction({ sceneUpdate, dispatch })
    } else {
      dispatch(setLoadingAction(false))

      return false
    }
  }

  if (response.errorMessage) {
    dispatch(setLoadingAction(false))

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
  dispatch(setLoadingAction(false))

  return true
}
