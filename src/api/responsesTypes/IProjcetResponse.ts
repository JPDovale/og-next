import { IAvatar } from './ICreateResponse'

export interface ISharedWhitUsers {
  id: string
  permission: 'view' | 'edit' | 'comment'
  email: string
  username: string
}

interface IStructure {
  act1?: string
  act2?: string
  act3?: string
}

export interface IResponse {
  id: string
  userId: string
  username: string
  userAvatar: string
  content: string
  createAt?: string
  updateAt?: string
}

export interface IComment {
  id: string
  userId: string
  username: string
  userAvatar: string
  to: string
  content: string
  responses?: IResponse[]
  createAt?: string
  updateAt?: string
}

export interface IPlotProject {
  onePhrase?: string
  premise?: string
  storyteller?: string
  literaryGenere?: string
  subgenre?: string
  ambient?: string
  countTime?: string
  historicalFact?: string
  details?: string
  summary?: string
  persons?: string[]
  structure?: IStructure
  urlOfText?: string
  comments?: IComment[]
}

export interface IProjectResponse {
  id: string
  name: string
  createdPerUser: string
  users: ISharedWhitUsers[]
  private: boolean
  password?: string
  type: string
  createAt: string
  updateAt: string
  image?: IAvatar
  plot: IPlotProject
  errorMessage?: string
  errorTitle?: string
}
