import { IBoxResponse } from '@api/responsesTypes/IBoxResponse'
import { ITimelineResponse } from '@api/responsesTypes/ITimelinesResponse'
import { createPersonAction } from '@contexts/projects/reducer/actions/persons/createPersonAction'
import { Dispatch } from 'react'
import { ICreatePersonDTO } from '../../../../api/dtos/ICreatePersonDTO'
import { createPersonRequest } from '../../../../api/personsRequests'
import { IPersonsResponse } from '../../../../api/responsesTypes/IPersonsResponse'
import { refreshSessionFunction } from '../../../user/functions/refreshSessionFunction'
import {
  setErrorAction,
  setLoadingAction,
} from '../../reducer/actionsProjectsReducer'

export async function createNewPersonFunction(
  newPerson: ICreatePersonDTO,
  dispatch: Dispatch<any>,
): Promise<boolean> {
  dispatch(setLoadingAction(true))

  const response = await createPersonRequest(newPerson)

  if (response.errorMessage === 'Invalid token') {
    const isRefreshed = await refreshSessionFunction()

    if (isRefreshed) {
      return createNewPersonFunction(newPerson, dispatch)
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

  const person = response.person as IPersonsResponse
  const box = response.box as IBoxResponse
  const timeline = response.timeline as ITimelineResponse

  dispatch(createPersonAction({ box, person, timeline }))

  return true
}
