import { createBoxRequest } from '@api/boxesRequests'
import { ICreateBoxRequest } from '@api/boxesRequests/types/ICreateBoxRequest'
import { IBoxResponse } from '@api/responsesTypes/IBoxResponse'
import { Dispatch } from 'react'
import { refreshSessionFunction } from '../../../user/functions/refreshSessionFunction'
import {
  addBoxAction,
  setErrorAction,
  setLoadingAction,
} from '../../reducer/actionsProjectsReducer'

interface ICreateBookFunction {
  newBox: ICreateBoxRequest
  dispatch: Dispatch<any>
}

export async function createBoxFunction({
  dispatch,
  newBox,
}: ICreateBookFunction): Promise<boolean> {
  dispatch(setLoadingAction(true))

  const response = await createBoxRequest(newBox)

  if (response.errorMessage === 'Invalid token') {
    const isRefreshed = await refreshSessionFunction()

    if (isRefreshed) {
      return createBoxFunction({ newBox, dispatch })
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

  dispatch(addBoxAction(boxReceipted))
  dispatch(setLoadingAction(false))

  return true
}
