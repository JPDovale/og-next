import { IFeatures } from '@api/responsesTypes/IProjectResponse'

export interface IChangeFeaturesUsingRequest {
  projectId: string
  features: IFeatures
}
