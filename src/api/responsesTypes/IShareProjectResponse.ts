export interface IShareProjectResponse {
  message: string
  errors: {
    error: string
    email: string
  }[]
}
