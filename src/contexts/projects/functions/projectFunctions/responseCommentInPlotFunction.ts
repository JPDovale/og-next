import { Dispatch } from 'react'
import { ICreateCommentDTO } from '../../../../api/dtos/ICreateNewCommentDTO'
import { responseCommentInPlotRequest } from '../../../../api/projectsRequests'
import { refreshSessionFunction } from '../../../user/functions/refreshSessionFunction'
import {
  setErrorAction,
  updateProjectAction,
} from '../../reducer/actionsProjectsReducer'

export async function responseCommentInPlotFunction(
  responseComment: ICreateCommentDTO,
  projectId: string,
  commentId: string,
  dispatch: Dispatch<any>,
): Promise<void> {
  if (!responseComment || !projectId || !commentId) {
    return dispatch(
      setErrorAction({
        title: 'Error ao processar as informações',
        message:
          'Verifique as informações fornecidas e tente novamente. Certifique-se de que todos os campos estão preenchidos corretamente.',
      }),
    )
  }

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

  dispatch(updateProjectAction(response))
}
