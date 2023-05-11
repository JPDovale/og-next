import { ICreatePersonDTO } from '@api/dtos/ICreatePersonDTO'

export interface ICreatePersonRequest {
  projectId: string
  newPerson: ICreatePersonDTO
}
