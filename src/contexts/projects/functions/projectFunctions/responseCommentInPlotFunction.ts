import { Dispatch } from 'react'
import { ICreateCommentDTO } from '@api/dtos/ICreateNewCommentDTO'
import { responseCommentInPlotRequest } from '@api/projectsRequests'
import { setLoadingAction } from '@contexts/projects/reducer/actions/projects/setLoadingAction'
import { responseDealings } from '@services/responseDealings'
import { updateProjectAction } from '@contexts/projects/reducer/actions/projects/updateProjectAction'
import { IProjectResponse } from '@api/responsesTypes/IProjectResponse'

interface IResponseCommentInPlotFunction {
  responseComment: ICreateCommentDTO
  projectId: string
  commentId: string
  dispatch: Dispatch<any>
}

export async function responseCommentInPlotFunction({
  responseComment,
  projectId,
  commentId,
  dispatch,
}: IResponseCommentInPlotFunction): Promise<boolean> {
  dispatch(setLoadingAction(true))

  const response = await responseCommentInPlotRequest(
    responseComment,
    projectId,
    commentId,
  )

  const handledAnswer = await responseDealings({
    response,
    dispatch,
    into: 'projects',
    callback: () =>
      responseCommentInPlotFunction({
        dispatch,
        projectId,
        commentId,
        responseComment,
      }),
  })

  if (handledAnswer === false) return false

  const project = response as IProjectResponse

  dispatch(updateProjectAction({ project }))
  return true
}
