import { Dispatch } from 'react'
import { deleteProjectRequest } from '../../../../api/projectsRequests'
import { refreshSessionFunction } from '../../../user/functions/refreshSessionFunction'
import {
  deleteProjectAction,
  setErrorAction,
} from '../../reducer/actionsProjectsReducer'

export async function deleteProjectFunction(
  projectId: string,
  dispatch: Dispatch<any>,
): Promise<void> {
  if (!projectId) {
    return dispatch(
      setErrorAction({
        title: 'Error ao processar as informações',
        message:
          'Verifique as informações fornecidas e tente novamente. Certifique-se de que todos os campos estão preenchidos corretamente.',
      }),
    )
  }
  const response = await deleteProjectRequest(projectId)

  if (response.errorMessage === 'Invalid token') {
    const isRefreshed = await refreshSessionFunction()

    if (isRefreshed) {
      return deleteProjectFunction(projectId, dispatch)
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

  dispatch(deleteProjectAction(projectId))
}
