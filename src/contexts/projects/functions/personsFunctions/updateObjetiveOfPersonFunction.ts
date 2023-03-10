import { Dispatch } from 'react'
import { IUpdateObjetiveDTO } from '../../../../api/dtos/IUpdateObjetiveDTO'
import { updateObjetiveOfPersonRequest } from '../../../../api/personsRequests'
import {
  IObjective,
  IPersonsResponse,
} from '../../../../api/responsesTypes/IPersonsResponse'
import { refreshSessionFunction } from '../../../user/functions/refreshSessionFunction'
import {
  setErrorAction,
  setLoadingAction,
  updatePersonAction,
} from '../../reducer/actionsProjectsReducer'

export async function updateObjetiveOfPersonFunction(
  objective: IObjective,
  personId: string,
  objectiveId: string,
  dispatch: Dispatch<any>,
): Promise<boolean> {
  dispatch(setLoadingAction(true))

  const updatedObjective: IUpdateObjetiveDTO = {
    objective,
    objectiveId,
    personId,
  }

  const response = await updateObjetiveOfPersonRequest(updatedObjective)

  if (response.errorMessage === 'Invalid token') {
    const isRefreshed = await refreshSessionFunction()

    if (isRefreshed) {
      return updateObjetiveOfPersonFunction(
        objective,
        personId,
        objectiveId,
        dispatch,
      )
    } else {
      dispatch(setLoadingAction(false))

      return false
    }
  }

  if (response.errorMessage) {
    dispatch(setLoadingAction(false))

    dispatch(
      setErrorAction({
        title: response.errorTitle,
        message: response.errorMessage,
      }),
    )
    return false
  }

  const person = response as IPersonsResponse
  dispatch(updatePersonAction(person))
  dispatch(setLoadingAction(false))

  return true
}
