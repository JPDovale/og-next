import { Dispatch } from 'react'
import { unshareProjectRequest } from '../../../../api/projectsRequests'
import { IProjectResponse } from '../../../../api/responsesTypes/IProjcetResponse'
import { refreshSessionFunction } from '../../../user/functions/refreshSessionFunction'
import {
  setErrorAction,
  updateProjectAction,
} from '../../reducer/actionsProjectsReducer'

export async function unshareProjectFunction(
  userEmail: string,
  projectId: string,
  dispatch: Dispatch<any>,
): Promise<void> {
  if (!userEmail || !projectId) {
    dispatch(
      setErrorAction({
        title: 'Error ao processar as informações',
        message:
          'Verifique as informações fornecidas e tente novamente. Certifique-se de que todos os campos estão preenchidos corretamente.',
      }),
    )
  }

  const response = await unshareProjectRequest(userEmail, projectId)

  if (response.errorMessage === 'Invalid token') {
    const isRefreshed = await refreshSessionFunction()

    if (isRefreshed) {
      return unshareProjectFunction(userEmail, projectId, dispatch)
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

  const project = response as IProjectResponse
  dispatch(updateProjectAction(project))
}
