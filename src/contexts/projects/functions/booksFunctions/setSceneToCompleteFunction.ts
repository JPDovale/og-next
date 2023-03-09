import { Dispatch } from 'react'
import { setSceneToCompleteRequest } from '../../../../api/booksRequests'
import { ISetSceneToCompleteRequest } from '../../../../api/booksRequests/types/ISetSceneToCompleteRequest'
import { IBooksResponse } from '../../../../api/responsesTypes/IBooksResponse'
import { refreshSessionFunction } from '../../../user/functions/refreshSessionFunction'
import {
  setErrorAction,
  setLoadingAction,
  updateBookAction,
} from '../../reducer/actionsProjectsReducer'

interface ISetSceneToCompleteFunction {
  sceneToComplete: ISetSceneToCompleteRequest
  dispatch: Dispatch<any>
}

export async function setSceneToCompleteFunction({
  sceneToComplete,
  dispatch,
}: ISetSceneToCompleteFunction): Promise<boolean> {
  dispatch(setLoadingAction(true))

  const response = await setSceneToCompleteRequest(sceneToComplete)

  if (response.errorMessage === 'Invalid token') {
    const isRefreshed = await refreshSessionFunction()

    if (isRefreshed) {
      return setSceneToCompleteFunction({ sceneToComplete, dispatch })
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
