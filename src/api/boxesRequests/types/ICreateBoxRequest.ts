export interface ICreateBoxRequest {
  name: string
  description?: string
  tags?: Array<{
    name: string
  }>
}
