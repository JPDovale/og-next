import { ICreateCommentDTO } from '@api/dtos/ICreateNewCommentDTO'
import { commentInPlotRequest } from '@api/projectsRequests'
import { IResolveEvent } from '@hooks/useProjects/types/IResolveEvent'
import { responseDealings } from '@utils/data/responseDealings'
import { IRefetchProject } from '../types/IRefetchProject'

export async function commentInPlot(
  projectId: string,
  newComment: ICreateCommentDTO,
  refetchProject: IRefetchProject,
): Promise<IResolveEvent> {
  const response = await commentInPlotRequest(newComment, projectId)

  const { handledAnswer, error } = await responseDealings<IResolveEvent>({
    response,
    callback: () => commentInPlot(projectId, newComment, refetchProject),
  })

  if (handledAnswer) {
    await refetchProject()
  }

  return {
    resolved: handledAnswer,
    error,
  }
}
