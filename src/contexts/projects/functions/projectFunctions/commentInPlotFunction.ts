import { Dispatch } from 'react'
import { ICreateCommentDTO } from '@api/dtos/ICreateNewCommentDTO'
import { commentInPlotRequest } from '@api/projectsRequests'
import { setLoadingAction } from '@contexts/projects/reducer/actions/projects/setLoadingAction'
import { responseDealings } from '@services/responseDealings'
import { IProjectResponse } from '@api/responsesTypes/IProjectResponse'
import { updateProjectAction } from '@contexts/projects/reducer/actions/projects/updateProjectAction'

interface ICommentInPlotFunction {
  comment: ICreateCommentDTO
  projectId: string
  dispatch: Dispatch<any>
}

export async function commentInPlotFunction({
  comment,
  projectId,
  dispatch,
}: ICommentInPlotFunction): Promise<boolean> {
  dispatch(setLoadingAction(true))

  const response = await commentInPlotRequest(comment, projectId)

  const handledAnswer = await responseDealings({
    response,
    dispatch,
    into: 'projects',
    callback: () => commentInPlotFunction({ comment, projectId, dispatch }),
  })

  if (handledAnswer === false) return false

  const project = response as IProjectResponse

  dispatch(updateProjectAction({ project }))

  return true
}
