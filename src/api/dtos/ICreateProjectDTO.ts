import { IFeatures } from '@api/responsesTypes/IProjectResponse'

export interface ICreateProjectDTO {
  name: string
  type: string
  private?: boolean
  password?: string
  features: IFeatures
  timeLine?: {
    initialDate: number
    timeChrist: 'A.C.' | 'D.C.'
  }
}
