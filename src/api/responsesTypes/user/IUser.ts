import { INotification } from '../IUserResponse'

export interface IAccount {
  id: string
  type: string
  provider: string
  provider_account_id: string
  refresh_token: string | null
  access_token: string | null
  expires_at: number | null
  token_type: string | null
  scope: string | null
  id_token: string | null
  session_state: string | null
  user_id: string
}

export interface ISession {
  id: string
  session_token: string | null
  expires: Date
  user_id: string
}

export type IPaymentStatus =
  | 'active'
  | 'canceled'
  | 'incomplete'
  | 'incomplete_expired'
  | 'past_due'
  | 'paused'
  | 'trialing'
  | 'unpaid'

export interface IUser {
  infos: {
    username: string
    email: string
    age: string
    sex: string
    name: string
    avatar: {
      alt: string
      url: string | undefined
    }
    createdAt: Date
  }
  account: {
    id: string
    isSocialLogin: boolean
    notification: {
      numberNew: number
      notifications: INotification[]
    }
    subscription: {
      id: string
      status: IPaymentStatus
      expiresAt: Date | null
      mode: 'payment' | 'subscription'
    } | null
  }
}

export interface IUserResponse {
  user: IUser
}

export interface IAccountResponse {
  account: IAccount
}

export interface ISessionResponse {
  session: ISession
}

export interface ISessionAndUserResponse {
  user: IUser
  session: ISession
}
