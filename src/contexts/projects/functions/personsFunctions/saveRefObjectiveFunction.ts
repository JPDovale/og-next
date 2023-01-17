import { Dispatch } from 'react'
import { saveRefObjectiveOfPersonRequest } from '../../../../api/personsRequests'
import {
  IObjective,
  IPersonsResponse,
} from '../../../../api/responsesTypes/IPersonsResponse'
import { refreshSessionFunction } from '../../../user/functions/refreshSessionFunction'
import {
  setErrorAction,
  updatePersonAction,
} from '../../reducer/actionsProjectsReducer'

export async function saveRefObjectiveFunction(
  objective: IObjective,
  personId: string,
  projectId: string,
  refId: string,
  dispatch: Dispatch<any>,
): Promise<boolean> {
  if (!objective || !personId || !objective || !refId) {
    dispatch(
      setErrorAction({
        title: 'Error ao processar as informações',
        message:
          'Verifique as informações fornecidas e tente novamente. Certifique-se de que todos os campos estão preenchidos corretamente.',
      }),
    )
    return false
  }

  const newObjectReference = {
    objective,
    personId,
    projectId,
    refId,
  }

  const response = await saveRefObjectiveOfPersonRequest(newObjectReference)

  if (response.errorMessage === 'Invalid token') {
    const isRefreshed = await refreshSessionFunction()

    if (isRefreshed) {
      return saveRefObjectiveFunction(
        objective,
        personId,
        projectId,
        refId,
        dispatch,
      )
    } else {
      return false
    }
  }

  if (response.errorMessage) {
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

  return true
}
