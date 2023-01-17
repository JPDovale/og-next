import { IObjective } from '../responsesTypes/IPersonsResponse'

export interface ICreateObjectiveDTO {
  objectives: IObjective[]
  personId: string
  projectId: string
}
