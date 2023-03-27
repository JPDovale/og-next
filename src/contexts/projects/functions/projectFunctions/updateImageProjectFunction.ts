import { Dispatch } from 'react'
import { updateImageProjectRequest } from '../../../../api/projectsRequests'
import { IProjectResponse } from '../../../../api/responsesTypes/IProjcetResponse'
import { refreshSessionFunction } from '../../../user/functions/refreshSessionFunction'
import {
  setErrorAction,
  setLoadingAction,
  updateProjectAction,
} from '../../reducer/actionsProjectsReducer'

export async function updateImageProjectFunction(
  projectId: string,
  file: File,
  dispatch: Dispatch<any>,
): Promise<boolean> {
  dispatch(setLoadingAction(true))

  const response = await updateImageProjectRequest(projectId, file)

  if (response.errorMessage === 'Invalid token') {
    const isRefreshed = await refreshSessionFunction()

    if (isRefreshed) {
      return updateImageProjectFunction(projectId, file, dispatch)
    } else {
      dispatch(setLoadingAction(false))

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
    dispatch(setLoadingAction(false))

    return false
  }
  const projectUpdated = response as IProjectResponse

  dispatch(updateProjectAction(projectUpdated))
  dispatch(setLoadingAction(false))

  return true
}
