import { IBoxResponse } from '@api/responsesTypes/IBoxResponse'
import { Dispatch } from 'react'
import { deleteObjectiveRequest } from '../../../../api/personsRequests'
import { IPersonsResponse } from '../../../../api/responsesTypes/IPersonsResponse'
import { refreshSessionFunction } from '../../../user/functions/refreshSessionFunction'
import {
  setErrorAction,
  setLoadingAction,
  updatePersonAction,
} from '../../reducer/actionsProjectsReducer'

interface IDeleteObjectiveFunction {
  personId: string
  objectiveId: string
  dispatch: Dispatch<any>
}

export async function deleteObjectiveFunction({
  personId,
  dispatch,
  objectiveId,
}: IDeleteObjectiveFunction): Promise<void> {
  dispatch(setLoadingAction(true))

  const response = await deleteObjectiveRequest({ personId, objectiveId })

  if (response.errorMessage === 'Invalid token') {
    const isRefreshed = await refreshSessionFunction()

    if (isRefreshed) {
      return deleteObjectiveFunction({ dispatch, objectiveId, personId })
    } else {
      dispatch(setLoadingAction(false))

      return
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
    return
  }

  const person = response.person as IPersonsResponse
  const box = response.box as IBoxResponse

  dispatch(setLoadingAction(false))
  dispatch(updatePersonAction(person, box))
}
