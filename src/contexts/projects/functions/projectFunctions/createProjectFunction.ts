import { Dispatch } from 'react'
import { ICreateProjectDTO } from '../../../../api/dtos/ICreateProjectDTO'
import { createProjectRequest } from '../../../../api/projectsRequests'
import { IProjectResponse } from '../../../../api/responsesTypes/IProjcetResponse'
import { refreshSessionFunction } from '../../../user/functions/refreshSessionFunction'
import {
  addProjectAction,
  setErrorAction,
  setLoadingAction,
} from '../../reducer/actionsProjectsReducer'

export async function createProjectFunction(
  newProject: ICreateProjectDTO,
  dispatch: Dispatch<any>,
): Promise<void | string> {
  dispatch(setLoadingAction(true))
  const response = await createProjectRequest(newProject)

  if (response.errorMessage === 'Invalid token') {
    const isRefreshed = await refreshSessionFunction()

    if (isRefreshed) {
      return createProjectFunction(newProject, dispatch)
    } else {
      dispatch(setLoadingAction(false))

      return
    }
  }

  if (response.errorMessage) {
    dispatch(setLoadingAction(false))
    dispatch(
      setErrorAction({
        title: response.errorTitle as string,
        message: response.errorMessage,
      }),
    )
    return
  }

  const project = response as IProjectResponse

  dispatch(addProjectAction(project))
  dispatch(setLoadingAction(false))

  return project.id
}
