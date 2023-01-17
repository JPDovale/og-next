import { INotification } from './IUserResponse'

export interface IAvatar {
  fileName: string
  url: string
  createdAt?: string
  updatedAt?: string
}

export interface ICreateResponse {
  user: {
    age: string
    avatar?: IAvatar
    email: string
    id: string
    sex: string
    username: string
    notifications: INotification[]
    createAt: string
    updateAt: string
    isInitialized: boolean
    isSocialLogin: boolean
    name: string
  }
  refreshToken: string
  token: string
  errorMessage?: string
  errorTitle?: string
}

export interface ICreateSessionResponse {
  user: {
    age: string
    avatar?: IAvatar
    email: string
    id: string
    sex: string
    username: string
    notifications: INotification[]
    createAt: string
    updateAt: string
    isInitialized: boolean
    isSocialLogin: boolean
    name: string
  }
  refreshToken: string
  token: string

  errorMessage?: string
  errorTitle?: string
}
