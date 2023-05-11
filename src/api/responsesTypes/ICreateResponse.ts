import { IUserResponse } from './IUserResponse'

export interface IAvatar {
  fileName: string
  url: string
  createdAt?: string
  updatedAt?: string
}

export interface ICreateResponse {
  user: IUserResponse
  errorMessage?: string
  errorTitle?: string
}

export interface ICreateSessionResponse {
  user: IUserResponse
  errorMessage?: string
  errorTitle?: string
}
