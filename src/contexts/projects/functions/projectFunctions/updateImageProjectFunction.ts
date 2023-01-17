import { Dispatch } from 'react'
import { updateImageProjectRequest } from '../../../../api/projectsRequests'
import { IProjectResponse } from '../../../../api/responsesTypes/IProjcetResponse'
import { refreshSessionFunction } from '../../../user/functions/refreshSessionFunction'
import {
  setErrorAction,
  updateProjectAction,
} from '../../reducer/actionsProjectsReducer'

export async function updateImageProjectFunction(
  projectId: string,
  file: File,
  dispatch: Dispatch<any>,
): Promise<boolean> {
  if (!projectId || !file) {
    dispatch(
      setErrorAction({
        title: 'Error ao processar as informações',
        message:
          'Verifique as informações fornecidas e tente novamente. Certifique-se de que todos os campos estão preenchidos corretamente.',
      }),
    )
    return false
  }

  const response = await updateImageProjectRequest(projectId, file)

  if (response.errorMessage === 'Invalid token') {
    const isRefreshed = await refreshSessionFunction()

    if (isRefreshed) {
      return updateImageProjectFunction(projectId, file, dispatch)
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
  const projectUpdated = response as IProjectResponse

  dispatch(updateProjectAction(projectUpdated))
  return true
}
