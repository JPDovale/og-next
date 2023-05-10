import { ICreateBookDTO } from '@api/dtos/booksDTOS/ICreateBookDTO'

export interface ICreateBookRequest {
  projectId: string
  book: ICreateBookDTO
}
