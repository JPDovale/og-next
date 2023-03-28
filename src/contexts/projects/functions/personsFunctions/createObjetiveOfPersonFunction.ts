import { IBoxResponse } from '@api/responsesTypes/IBoxResponse'
import { Dispatch } from 'react'
import { ICreateObjectiveDTO } from '../../../../api/dtos/ICreateObjectiveDTO'
import { createObjetiveOfPersonRequest } from '../../../../api/personsRequests'
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

export async function createObjetiveOfPersonFunction(
  objective: IObjective,
  personId: string,
  projectId: string,
  dispatch: Dispatch<any>,
): Promise<boolean> {
  dispatch(setLoadingAction(true))

  const newObjetive: ICreateObjectiveDTO = {
    objective,
    projectId,
    personId,
  }

  const response = await createObjetiveOfPersonRequest(newObjetive)

  if (response.errorMessage === 'Invalid token') {
    const isRefreshed = await refreshSessionFunction()

    if (isRefreshed) {
      return createObjetiveOfPersonFunction(
        objective,
        personId,
        projectId,
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

  const person = response.person as IPersonsResponse
  const box = response.box as IBoxResponse
  dispatch(updatePersonAction(person, box))
  dispatch(setLoadingAction(false))

  return true
}
