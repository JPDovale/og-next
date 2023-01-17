import { IObjective } from '../responsesTypes/IPersonsResponse'

export interface IUpdateObjetiveDTO {
  objective: IObjective
  personId: string
  objectiveId: string
}
