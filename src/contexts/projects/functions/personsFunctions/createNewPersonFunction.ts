import { IBoxResponse } from '@api/responsesTypes/IBoxResponse'
import { Dispatch } from 'react'
import { ICreatePersonDTO } from '../../../../api/dtos/ICreatePersonDTO'
import { createPersonRequest } from '../../../../api/personsRequests'
import { IPersonsResponse } from '../../../../api/responsesTypes/IPersonsResponse'
import { refreshSessionFunction } from '../../../user/functions/refreshSessionFunction'
import {
  addPersonAction,
  setErrorAction,
  setLoadingAction,
  updateBoxAction,
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

  dispatch(setLoadingAction(false))
  dispatch(addPersonAction(person))
  dispatch(updateBoxAction(box))

  return true
}
