import { Dispatch } from 'react'
import { ICreateCommentDTO } from '../../../../api/dtos/ICreateNewCommentDTO'
import { responseCommentInPlotRequest } from '../../../../api/projectsRequests'
import { refreshSessionFunction } from '../../../user/functions/refreshSessionFunction'
import {
  setErrorAction,
  setLoadingAction,
  updateProjectAction,
} from '../../reducer/actionsProjectsReducer'

export async function responseCommentInPlotFunction(
  responseComment: ICreateCommentDTO,
  projectId: string,
  commentId: string,
  dispatch: Dispatch<any>,
): Promise<void> {
  dispatch(setLoadingAction(true))

  const response = await responseCommentInPlotRequest(
    responseComment,
    projectId,
    commentId,
  )

  if (response.errorMessage === 'Invalid token') {
    const isRefreshed = await refreshSessionFunction()

    if (isRefreshed) {
      return responseCommentInPlotFunction(
        responseComment,
        projectId,
        commentId,
        dispatch,
      )
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
