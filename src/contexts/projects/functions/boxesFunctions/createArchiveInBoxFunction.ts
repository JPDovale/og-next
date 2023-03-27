import { createArchiveInBoxRequest } from '@api/boxesRequests'
import { IBoxResponse } from '@api/responsesTypes/IBoxResponse'
import {
  setErrorAction,
  setLoadingAction,
  updateBoxAction,
} from '@contexts/projects/reducer/actionsProjectsReducer'
import { refreshSessionFunction } from '@contexts/user/functions/refreshSessionFunction'
import { Dispatch } from 'react'
import { ICreateArchiveInBoxRequest } from './../../../../api/boxesRequests/types/ICreateArchiveInBoxRequest'

interface ICreateArchiveInBoxFunction {
  newArchive: ICreateArchiveInBoxRequest
  dispatch: Dispatch<any>
}

export async function createArchiveInBoxFunction({
  dispatch,
  newArchive,
}: ICreateArchiveInBoxFunction): Promise<boolean> {
  dispatch(setLoadingAction(true))

  const response = await createArchiveInBoxRequest(newArchive)

  if (response.errorMessage === 'Invalid token') {
    const isRefreshed = await refreshSessionFunction()

    if (isRefreshed) {
      return createArchiveInBoxFunction({ newArchive, dispatch })
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

  const boxReceipted = response.box as IBoxResponse

  dispatch(updateBoxAction(boxReceipted))
  dispatch(setLoadingAction(false))

  return true
}
