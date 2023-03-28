import { updateBoxRequest } from '@api/boxesRequests'
import { IBoxResponse } from '@api/responsesTypes/IBoxResponse'
import {
  setErrorAction,
  setLoadingAction,
  updateBoxAction,
} from '@contexts/projects/reducer/actionsProjectsReducer'
import { refreshSessionFunction } from '@contexts/user/functions/refreshSessionFunction'
import { Dispatch } from 'react'

interface IUpdateBoxFunction {
  boxId: string
  name?: string
  description?: string
  tags?: Array<{
    name: string
  }>
  dispatch: Dispatch<any>
}

export async function updateBoxFunction({
  boxId,
  name,
  description,
  tags,
  dispatch,
}: IUpdateBoxFunction): Promise<boolean> {
  dispatch(setLoadingAction(true))

  const response = await updateBoxRequest({
    boxId,
    name,
    description,
    tags,
  })

  if (response.errorMessage === 'Invalid token') {
    const isRefreshed = await refreshSessionFunction()

    if (isRefreshed) {
      return updateBoxFunction({
        boxId,
        name,
        description,
        tags,
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
