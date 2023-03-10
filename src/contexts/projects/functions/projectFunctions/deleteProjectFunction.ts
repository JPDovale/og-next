import { Dispatch } from 'react'
import { deleteProjectRequest } from '../../../../api/projectsRequests'
import { refreshSessionFunction } from '../../../user/functions/refreshSessionFunction'
import {
  deleteProjectAction,
  setErrorAction,
  setLoadingAction,
} from '../../reducer/actionsProjectsReducer'

export async function deleteProjectFunction(
  projectId: string,
  dispatch: Dispatch<any>,
): Promise<void> {
  dispatch(setLoadingAction(true))

  const response = await deleteProjectRequest(projectId)

  if (response.errorMessage === 'Invalid token') {
    const isRefreshed = await refreshSessionFunction()

    if (isRefreshed) {
      return deleteProjectFunction(projectId, dispatch)
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

  dispatch(setLoadingAction(false))
  dispatch(deleteProjectAction(projectId))
}
