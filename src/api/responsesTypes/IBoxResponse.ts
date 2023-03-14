interface IAvatar {
  fileName: string
  url: string
  createdAt?: string
  updatedAt?: string
}

export interface IArchive {
  images?: IAvatar[]
  archive: {
    id: string
    title: string
    description: string
    createdAt: string
    updatedAt: string
  }
  links?: Array<{
    type: 'id'
    id: string
  }>
}

export interface IBoxResponse {
  id: string
  name: string
  description: string
  projectId: string
  internal: boolean
  type: string
  tags: Array<{
    name: string
  }>
  archives: IArchive[]
  createdAt: string
  updatedAt: string
}
