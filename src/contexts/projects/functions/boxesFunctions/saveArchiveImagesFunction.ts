import { Dispatch } from 'react'
import { ISaveImagesRequest } from '@api/boxesRequests/types/ISaveImagesRequest'
import {
  setErrorAction,
  setLoadingAction,
  updateBoxAction,
} from '@contexts/projects/reducer/actionsProjectsReducer'
import { saveImagesRequest } from '@api/boxesRequests'
import { refreshSessionFunction } from '@contexts/user/functions/refreshSessionFunction'
import { IBoxResponse } from '@api/responsesTypes/IBoxResponse'

interface ISaveArchiveImagesFunction {
  imagesToSave: ISaveImagesRequest
  dispatch: Dispatch<any>
}

export async function saveArchiveImagesFunction({
  imagesToSave,
  dispatch,
}: ISaveArchiveImagesFunction): Promise<boolean> {
  dispatch(setLoadingAction(true))

  const response = await saveImagesRequest(imagesToSave)

  if (response.errorMessage === 'Invalid token') {
    const isRefreshed = await refreshSessionFunction()

    if (isRefreshed) {
      return saveArchiveImagesFunction({ imagesToSave, dispatch })
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
