import { Dispatch } from 'react'
import { createSceneRequest } from '../../../../api/booksRequests'
import { ICreateSceneRequest } from '../../../../api/booksRequests/types/ICreateSceneRequest'
import { IBooksResponse } from '../../../../api/responsesTypes/IBooksResponse'
import { refreshSessionFunction } from '../../../user/functions/refreshSessionFunction'
import {
  setErrorAction,
  setLoadingAction,
  updateBookAction,
} from '../../reducer/actionsProjectsReducer'

interface ICreateSceneFunction {
  newScene: ICreateSceneRequest
  dispatch: Dispatch<any>
}

export async function createSceneFunction({
  dispatch,
  newScene,
}: ICreateSceneFunction): Promise<boolean> {
  dispatch(setLoadingAction(true))

  const response = await createSceneRequest(newScene)

  if (response.errorMessage === 'Invalid token') {
    const isRefreshed = await refreshSessionFunction()

    if (isRefreshed) {
      return createSceneFunction({ newScene, dispatch })
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
