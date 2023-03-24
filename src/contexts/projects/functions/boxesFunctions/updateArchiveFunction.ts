import { updateArchiveRequest } from '@api/boxesRequests'
import { IBoxResponse } from '@api/responsesTypes/IBoxResponse'
import {
  setErrorAction,
  setLoadingAction,
  updateBoxAction,
} from '@contexts/projects/reducer/actionsProjectsReducer'
import { refreshSessionFunction } from '@contexts/user/functions/refreshSessionFunction'
import { Dispatch } from 'react'

interface IUpdateArchiveFunction {
  boxId: string
  archiveId: string
  title?: string
  description?: string
  dispatch: Dispatch<any>
}

export async function updateArchiveFunction({
  archiveId,
  boxId,
  title,
  description,
  dispatch,
}: IUpdateArchiveFunction): Promise<boolean> {
  dispatch(setLoadingAction(true))

  const response = await updateArchiveRequest({
    archiveId,
    boxId,
    title,
    description,
  })

  if (response.errorMessage === 'Invalid token') {
    const isRefreshed = await refreshSessionFunction()

    if (isRefreshed) {
      return updateArchiveFunction({
        archiveId,
        boxId,
        title,
        description,
        dispatch,
      })
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
