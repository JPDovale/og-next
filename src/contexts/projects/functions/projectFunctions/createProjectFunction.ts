import { Dispatch } from 'react'
import { ICreateProjectDTO } from '../../../../api/dtos/ICreateProjectDTO'
import { createProjectRequest } from '../../../../api/projectsRequests'
import { IProjectResponse } from '../../../../api/responsesTypes/IProjcetResponse'
import { refreshSessionFunction } from '../../../user/functions/refreshSessionFunction'
import {
  addProjectAction,
  setErrorAction,
} from '../../reducer/actionsProjectsReducer'

export async function createProjectFunction(
  newProject: ICreateProjectDTO,
  dispatch: Dispatch<any>,
): Promise<void | string> {
  if (!newProject) {
    return dispatch(
      setErrorAction({
        title: 'Error ao processar as informações',
        message:
          'Verifique as informações fornecidas e tente novamente. Certifique-se de que todos os campos estão preenchidos corretamente.',
      }),
    )
  }

  const response = await createProjectRequest(newProject)

  if (response.errorMessage === 'Invalid token') {
    const isRefreshed = await refreshSessionFunction()

    if (isRefreshed) {
      return createProjectFunction(newProject, dispatch)
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

  dispatch(addProjectAction(project))
  return project.id
}
