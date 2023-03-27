import { Dispatch } from 'react'
import { unshareProjectRequest } from '../../../../api/projectsRequests'
import { IProjectResponse } from '../../../../api/responsesTypes/IProjcetResponse'
import { refreshSessionFunction } from '../../../user/functions/refreshSessionFunction'
import {
  setErrorAction,
  setLoadingAction,
  updateProjectAction,
} from '../../reducer/actionsProjectsReducer'

export async function unshareProjectFunction(
  userEmail: string,
  projectId: string,
  dispatch: Dispatch<any>,
): Promise<void> {
  dispatch(setLoadingAction(true))

  const response = await unshareProjectRequest(userEmail, projectId)

  if (response.errorMessage === 'Invalid token') {
    const isRefreshed = await refreshSessionFunction()

    if (isRefreshed) {
      return unshareProjectFunction(userEmail, projectId, dispatch)
    } else {
      dispatch(setLoadingAction(false))

      return
    }
  }

  if (response.errorMessage) {
    dispatch(setLoadingAction(false))

    dispatch(
      setErrorAction({
        title: response.errorTitle,
        message: response.errorMessage,
      }),
    )
    return
  }

  const project = response as IProjectResponse
  dispatch(updateProjectAction(project))
  dispatch(setLoadingAction(false))
}
