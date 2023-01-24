import { IObjective } from '../responsesTypes/IPersonsResponse'

export interface ICreateObjectiveDTO {
  objective: IObjective
  personId: string
  projectId: string
}
