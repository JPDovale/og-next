import { Dispatch } from 'react'
import { ICreateCommentDTO } from '../../../../api/dtos/ICreateNewCommentDTO'
import { commentInPlotRequest } from '../../../../api/projectsRequests'
import { refreshSessionFunction } from '../../../user/functions/refreshSessionFunction'
import {
  setErrorAction,
  updateProjectAction,
} from '../../reducer/actionsProjectsReducer'

export async function commentInPlotFunction(
  comment: ICreateCommentDTO,
  projectId: string,
  dispatch: Dispatch<any>,
): Promise<void> {
  if (!comment || !projectId) {
    return dispatch(
      setErrorAction({
        title: 'Error ao processar as informações',
        message:
          'Verifique as informações fornecidas e tente novamente. Certifique-se de que todos os campos estão preenchidos corretamente.',
      }),
    )
  }
  const response = await commentInPlotRequest(comment, projectId)

  if (response.errorMessage === 'Invalid token') {
    const isRefreshed = await refreshSessionFunction()

    if (isRefreshed) {
      return commentInPlotFunction(comment, projectId, dispatch)
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
