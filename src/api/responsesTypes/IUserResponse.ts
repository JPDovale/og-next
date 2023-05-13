export interface INotification {
  id: string
  title: string
  content: string
  created_at: Date
}

export type ISubscription = {
  id: string
  subscription_stripe_id: string
  mode: string
  payment_status: string
  created_at: Date
  updated_at: Date
  expires_at: Date | null
  price_id: string
  user_id: string
}

export interface IUserResponse {
  avatar_url: string | null
  email: string
  id: string
  new_notifications: number
  notifications: INotification[]
  username: string
  name?: string
  avatar_filename?: string | null
  created_at?: Date
  subscription?: ISubscription | null
}
