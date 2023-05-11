import { IUpdatePlotDTO } from '@api/dtos/IUpdatePlotDTO'
import { updatePlotRequest } from '@api/projectsRequests'
import { IResolveEvent } from '@hooks/useProjects/types/IResolveEvent'
import { responseDealings } from '@utils/data/responseDealings'
import { IRefetchProject } from '../types/IRefetchProject'

export async function updatePlot(
  projectId: string,
  newPlot: IUpdatePlotDTO,
  refetchProject: IRefetchProject,
): Promise<IResolveEvent> {
  const response = await updatePlotRequest(projectId, newPlot)

  const { handledAnswer, error } = await responseDealings<IResolveEvent>({
    response,
    callback: () => updatePlot(projectId, newPlot, refetchProject),
  })

  if (handledAnswer) {
    await refetchProject()
  }

  return {
    resolved: handledAnswer,
    error,
  }
}
