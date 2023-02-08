import { Dispatch } from 'react'
import { updateNameProjectRequest } from '../../../../api/projectsRequests'
import { IProjectResponse } from '../../../../api/responsesTypes/IProjcetResponse'
import { refreshSessionFunction } from '../../../user/functions/refreshSessionFunction'
import {
  setErrorAction,
  updateProjectAction,
} from '../../reducer/actionsProjectsReducer'

interface IUpdateNameProjectFunction {
  name: string
  projectId: string
  dispatch: Dispatch<any>
}

export async function updateNameProjectFunction({
  dispatch,
  name,
  projectId,
}: IUpdateNameProjectFunction): Promise<void> {
  if (!name || !projectId) {
    return dispatch(
      setErrorAction({
        title: 'Error ao processar as informações',
        message:
          'Verifique as informações fornecidas e tente novamente. Certifique-se de que todos os campos estão preenchidos corretamente.',
      }),
    )
  }

  const response = await updateNameProjectRequest(name, projectId)

  if (response.errorMessage === 'Invalid token') {
    const isRefreshed = await refreshSessionFunction()

    if (isRefreshed) {
      return updateNameProjectFunction({ name, projectId, dispatch })
    } else {
      return
    }
  }

  if (response.errorMessage) {
    return dispatch(
      setErrorAction({
        title: response.errorTitle as string,
        message: response.errorMessage,
      }),
    )
  }

  const project = response as IProjectResponse
  dispatch(updateProjectAction(project))
}
