export interface IUpdateBoxRequest {
  boxId: string
  name?: string
  description?: string
  tags?: Array<{
    name: string
  }>
}
