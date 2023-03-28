import { Dispatch } from 'react'
import { updateImagePersonRequest } from '../../../../api/personsRequests'
import { IPersonsResponse } from '../../../../api/responsesTypes/IPersonsResponse'
import { refreshSessionFunction } from '../../../user/functions/refreshSessionFunction'
import {
  setErrorAction,
  setLoadingAction,
  updatePersonAction,
} from '../../reducer/actionsProjectsReducer'

export async function updateImageFromPersonFunction(
  file: File,
  personId: string,
  dispatch: Dispatch<any>,
): Promise<boolean> {
  dispatch(setLoadingAction(true))

  const response = await updateImagePersonRequest(personId, file)

  if (response.errorMessage === 'Invalid token') {
    const isRefreshed = await refreshSessionFunction()

    if (isRefreshed) {
      return updateImageFromPersonFunction(file, personId, dispatch)
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

  dispatch(setLoadingAction(false))
  dispatch(updatePersonAction(person))

  return true
}
