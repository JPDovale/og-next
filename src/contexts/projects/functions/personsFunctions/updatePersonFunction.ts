import { Dispatch } from 'react'
import { ICreatePersonDTO } from '../../../../api/dtos/ICreatePersonDTO'
import { updatePersonRequest } from '../../../../api/personsRequests'
import { IPersonsResponse } from '../../../../api/responsesTypes/IPersonsResponse'
import { refreshSessionFunction } from '../../../user/functions/refreshSessionFunction'
import {
  setErrorAction,
  setLoadingAction,
  updatePersonAction,
} from '../../reducer/actionsProjectsReducer'

export async function updatedPersonFunction(
  person: ICreatePersonDTO,
  personId: string,
  dispatch: Dispatch<any>,
): Promise<void> {
  dispatch(setLoadingAction(true))

  const response = await updatePersonRequest(person, personId)

  if (response.errorMessage === 'Invalid token') {
    const isRefreshed = await refreshSessionFunction()

    if (isRefreshed) {
      return updatedPersonFunction(person, personId, dispatch)
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

  const personUpdated = response as IPersonsResponse
  dispatch(updatePersonAction(personUpdated))
  dispatch(setLoadingAction(false))
}
