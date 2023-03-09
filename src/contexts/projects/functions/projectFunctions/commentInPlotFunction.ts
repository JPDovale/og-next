import { Dispatch } from 'react'
import { ICreateCommentDTO } from '../../../../api/dtos/ICreateNewCommentDTO'
import { commentInPlotRequest } from '../../../../api/projectsRequests'
import { refreshSessionFunction } from '../../../user/functions/refreshSessionFunction'
import {
  setErrorAction,
  setLoadingAction,
  updateProjectAction,
} from '../../reducer/actionsProjectsReducer'

export async function commentInPlotFunction(
  comment: ICreateCommentDTO,
  projectId: string,
  dispatch: Dispatch<any>,
): Promise<void> {
  dispatch(setLoadingAction(true))

  const response = await commentInPlotRequest(comment, projectId)

  if (response.errorMessage === 'Invalid token') {
    const isRefreshed = await refreshSessionFunction()

    if (isRefreshed) {
      return commentInPlotFunction(comment, projectId, dispatch)
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
  dispatch(updateProjectAction(response))
}
