import { ICreateCommentDTO } from '@api/dtos/ICreateNewCommentDTO'

export interface IResponseComment {
  response: ICreateCommentDTO
  commentId: string
}
