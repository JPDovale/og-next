import { Dispatch } from 'react'
import { ICreatePersonDTO } from '../../../../api/dtos/ICreatePersonDTO'
import { createPersonRequest } from '../../../../api/personsRequests'
import { IPersonsResponse } from '../../../../api/responsesTypes/IPersonsResponse'
import { refreshSessionFunction } from '../../../user/functions/refreshSessionFunction'
import {
  addPersonAction,
  setErrorAction,
} from '../../reducer/actionsProjectsReducer'

export async function createNewPersonFunction(
  newPerson: ICreatePersonDTO,
  dispatch: Dispatch<any>,
): Promise<boolean> {
  if (!newPerson) {
    dispatch(
      setErrorAction({
        title: 'Error ao processar as informações',
        message:
          'Verifique as informações fornecidas e tente novamente. Certifique-se de que todos os campos estão preenchidos corretamente.',
      }),
    )
    return false
  }

  const response = await createPersonRequest(newPerson)

  if (response.errorMessage === 'Invalid token') {
    const isRefreshed = await refreshSessionFunction()

    if (isRefreshed) {
      return createNewPersonFunction(newPerson, dispatch)
    } else {
      return false
    }
  }

  if (response.errorMessage) {
    dispatch(
      setErrorAction({
        title: response.errorTitle as string,
        message: response.errorMessage,
      }),
    )
    return false
  }

  const person = response as IPersonsResponse
  dispatch(addPersonAction(person))

  return true
}
