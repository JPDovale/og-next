import { IAvatar } from './ICreateResponse'
import { INotification } from './IUserResponse'

export interface IInitResponse {
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
