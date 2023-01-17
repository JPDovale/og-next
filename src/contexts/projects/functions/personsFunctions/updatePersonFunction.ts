import { Dispatch } from 'react'
import { ICreatePersonDTO } from '../../../../api/dtos/ICreatePersonDTO'
import { updatePersonRequest } from '../../../../api/personsRequests'
import { IPersonsResponse } from '../../../../api/responsesTypes/IPersonsResponse'
import { refreshSessionFunction } from '../../../user/functions/refreshSessionFunction'
import {
  setErrorAction,
  updatePersonAction,
} from '../../reducer/actionsProjectsReducer'

export async function updatedPersonFunction(
  person: ICreatePersonDTO,
  personId: string,
  dispatch: Dispatch<any>,
): Promise<void> {
  if (!person) {
    dispatch(
      setErrorAction({
        title: 'Error ao processar as informações',
        message:
          'Verifique as informações fornecidas e tente novamente. Certifique-se de que todos os campos estão preenchidos corretamente.',
      }),
    )
  }

  const response = await updatePersonRequest(person, personId)

  if (response.errorMessage === 'Invalid token') {
    const isRefreshed = await refreshSessionFunction()

    if (isRefreshed) {
      return updatedPersonFunction(person, personId, dispatch)
    }
  }

  if (response.errorMessage) {
    return dispatch(
      setErrorAction({
        title: response.errorTitle,
        message: response.errorMessage,
      }),
    )
  }

  const personUpdated = response as IPersonsResponse
  dispatch(updatePersonAction(personUpdated))
}
