import { changeFeaturesUsingRequest } from '@api/projectsRequests'
import { IFeatures } from '@api/responsesTypes/IProjectResponse'
import { IResolveEvent } from '@hooks/useProjects/types/IResolveEvent'
import { responseDealings } from '@utils/data/responseDealings'
import { IRefetchProject } from '../types/IRefetchProject'

export async function changeFeaturesUsing(
  projectId: string,
  features: IFeatures,
  refetchProject: IRefetchProject,
): Promise<IResolveEvent> {
  const response = await changeFeaturesUsingRequest({ projectId, features })

  const { handledAnswer, error } = await responseDealings<IResolveEvent>({
    response,
    callback: () => changeFeaturesUsing(projectId, features, refetchProject),
  })

  if (handledAnswer) {
    await refetchProject()
  }

  return {
    resolved: handledAnswer,
    error,
  }
}
