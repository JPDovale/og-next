import { Dispatch } from 'react'
import { deleteObjectiveRequest } from '../../../../api/personsRequests'
import { IPersonsResponse } from '../../../../api/responsesTypes/IPersonsResponse'
import { refreshSessionFunction } from '../../../user/functions/refreshSessionFunction'
import {
  setErrorAction,
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
  if (!objectiveId || !personId) {
    return dispatch(
      setErrorAction({
        title: 'Error ao processar as informações',
        message:
          'Verifique as informações fornecidas e tente novamente. Certifique-se de que todos os campos estão preenchidos corretamente.',
      }),
    )
  }

  const response = await deleteObjectiveRequest({ personId, objectiveId })

  if (response.errorMessage === 'Invalid token') {
    const isRefreshed = await refreshSessionFunction()

    if (isRefreshed) {
      return deleteObjectiveFunction({ dispatch, objectiveId, personId })
    } else {
      return
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

  const person = response as IPersonsResponse
  dispatch(updatePersonAction(person))
}
