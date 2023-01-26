import { IAvatar } from './ICreateResponse'

export interface INotification {
  id?: string
  title: string
  content: string
  isVisualized?: boolean
  createAt: string
}
export interface IUserResponse {
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
