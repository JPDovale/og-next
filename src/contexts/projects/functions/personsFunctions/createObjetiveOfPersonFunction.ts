import { Dispatch } from 'react'
import { ICreateObjectiveDTO } from '../../../../api/dtos/ICreateObjectiveDTO'
import { createObjetiveOfPersonRequest } from '../../../../api/personsRequests'
import {
  IObjective,
  IPersonsResponse,
} from '../../../../api/responsesTypes/IPersonsResponse'
import { IProjectResponse } from '../../../../api/responsesTypes/IProjcetResponse'
import { refreshSessionFunction } from '../../../user/functions/refreshSessionFunction'
import {
  setErrorAction,
  updatePersonAction,
} from '../../reducer/actionsProjectsReducer'

export async function createObjetiveOfPersonFunction(
  objective: IObjective,
  personId: string,
  projectId: string,
  dispatch: Dispatch<any>,
): Promise<boolean> {
  if (!objective || !personId || !objective) {
    dispatch(
      setErrorAction({
        title: 'Error ao processar as informações',
        message:
          'Verifique as informações fornecidas e tente novamente. Certifique-se de que todos os campos estão preenchidos corretamente.',
      }),
    )
    return false
  }

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

  const person = response.person as IPersonsResponse
  const project = response.project as IProjectResponse
  dispatch(updatePersonAction(person, project))

  return true
}
