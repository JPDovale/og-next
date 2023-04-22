export interface INotification {
  id: string
  title: string
  content: string
  created_at: Date
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
}
