import { deleteArchiveBoxRequest } from '@api/boxesRequests'
import { IBoxResponse } from '@api/responsesTypes/IBoxResponse'
import {
  setErrorAction,
  setLoadingAction,
  updateBoxAction,
} from '@contexts/projects/reducer/actionsProjectsReducer'
import { refreshSessionFunction } from '@contexts/user/functions/refreshSessionFunction'
import { Dispatch } from 'react'

interface IDeleteArchiveBoxFunction {
  dispatch: Dispatch<any>
  boxId: string
  archiveId: string
}

export async function deleteArchiveBoxFunction({
  archiveId,
  boxId,
  dispatch,
}: IDeleteArchiveBoxFunction): Promise<boolean> {
  dispatch(setLoadingAction(true))

  const response = await deleteArchiveBoxRequest({
    archiveId,
    boxId,
  })

  if (response.errorMessage === 'Invalid token') {
    const isRefreshed = await refreshSessionFunction()

    if (isRefreshed) {
      return deleteArchiveBoxFunction({ boxId, archiveId, dispatch })
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

  const box = response.box as IBoxResponse

  dispatch(updateBoxAction(box))
  dispatch(setLoadingAction(false))
  return true
}
