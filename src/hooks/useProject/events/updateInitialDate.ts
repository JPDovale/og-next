import { updateInitialDateRequest } from '@api/projectsRequests'
import { IResolveEvent } from '@hooks/useProjects/types/IResolveEvent'
import { responseDealings } from '@utils/data/responseDealings'
import { IRefetchProject } from '../types/IRefetchProject'
import { IUpdateInitialDate } from '../types/IUpdateInitialDate'

export async function updateInitialDate(
  projectId: string,
  newDate: IUpdateInitialDate,
  refetchProject: IRefetchProject,
): Promise<IResolveEvent> {
  const response = await updateInitialDateRequest({ projectId, body: newDate })

  const { handledAnswer, error } = await responseDealings<IResolveEvent>({
    response,
    callback: () => updateInitialDate(projectId, newDate, refetchProject),
  })

  if (handledAnswer) {
    await refetchProject()
  }

  return {
    resolved: handledAnswer,
    error,
  }
}
