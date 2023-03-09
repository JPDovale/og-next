import { Dispatch } from 'react'
import { IShareProjectDTO } from '../../../../api/dtos/IShareProjectDTO'
import { shareProjectRequest } from '../../../../api/projectsRequests'
import { IProjectResponse } from '../../../../api/responsesTypes/IProjcetResponse'
import { refreshSessionFunction } from '../../../user/functions/refreshSessionFunction'
import {
  setErrorAction,
  setLoadingAction,
  updateProjectAction,
} from '../../reducer/actionsProjectsReducer'

export async function shareProjectFunction(
  share: IShareProjectDTO,
  dispatch: Dispatch<any>,
): Promise<boolean> {
  dispatch(setLoadingAction(true))

  const shareBodyRequest = {
    user: {
      email: share.email,
      permission: share.permission,
    },
    projectId: share.projectId,
  }

  const response = await shareProjectRequest(shareBodyRequest)

  if (response.errorMessage === 'Invalid token') {
    const isRefreshed = await refreshSessionFunction()

    if (isRefreshed) {
      return shareProjectFunction(share, dispatch)
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

  const project = response as IProjectResponse
  dispatch(updateProjectAction(project))
  dispatch(setLoadingAction(false))

  return true
}
