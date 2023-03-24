import { deleteBoxRequest } from '@api/boxesRequests'
import {
  deleteBoxAction,
  setErrorAction,
  setLoadingAction,
} from '@contexts/projects/reducer/actionsProjectsReducer'
import { refreshSessionFunction } from '@contexts/user/functions/refreshSessionFunction'
import { Dispatch } from 'react'

interface IDeleteBoxFunction {
  boxId: string
  dispatch: Dispatch<any>
}

export async function deleteBoxFunction({
  boxId,
  dispatch,
}: IDeleteBoxFunction): Promise<void> {
  dispatch(setLoadingAction(true))

  const response = await deleteBoxRequest(boxId)

  if (response.errorMessage === 'Invalid token') {
    const isRefreshed = await refreshSessionFunction()

    if (isRefreshed) {
      return deleteBoxFunction({
        boxId,
        dispatch,
      })
    } else {
      return dispatch(setLoadingAction(false))
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
    return
  }

  dispatch(deleteBoxAction(boxId))
  dispatch(setLoadingAction(false))
}
