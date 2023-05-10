import { responseCommentInPlotRequest } from '@api/projectsRequests'
import { IResolveEvent } from '@hooks/useProjects/types/IResolveEvent'
import { responseDealings } from '@utils/data/responseDealings'
import { IRefetchProject } from '../types/IRefetchProject'
import { IResponseComment } from '../types/IResponseComment'

export async function responseCommentInPlot(
  projectId: string,
  newResponse: IResponseComment,
  refetchProject: IRefetchProject,
): Promise<IResolveEvent> {
  const response = await responseCommentInPlotRequest(
    newResponse.response,
    projectId,
    newResponse.commentId,
  )

  const { handledAnswer, error } = await responseDealings<IResolveEvent>({
    response,
    callback: () =>
      responseCommentInPlot(projectId, newResponse, refetchProject),
  })

  if (handledAnswer) {
    await refetchProject()
  }

  return {
    resolved: handledAnswer,
    error,
  }
}
