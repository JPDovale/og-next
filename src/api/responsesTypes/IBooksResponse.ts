import { IAvatar } from './ICreateResponse'

export interface IScene {
  id: string
  sequence: string
  objective: string
  complete: boolean
  writtenWords?: string
  structure: {
    act1: string
    act2: string
    act3: string
  }
  persons: string[]
}

export interface ICapitule {
  id: string
  name: string
  sequence: string
  objective: string
  complete: boolean
  words?: string
  structure?: {
    act1?: string
    act2?: string
    act3?: string
  }
  scenes?: IScene[]
  createdAt: string
  updatedAt: string
}

export interface IBooksResponse {
  id: string
  title: string
  subtitle?: string
  defaultProject: string
  literaryGenere: string
  isbn: string
  frontCover: IAvatar
  generes: Array<{
    name: string
  }>
  authors: Array<{
    username: string
    email: string
    id: string
  }>
  plot: {
    onePhrase: string
    premise: string
    storyteller: string
    ambient: string
    countTime: string
    historicalFact: string
    details: string
    summary: string
    persons: string[]
    structure?: {
      act1?: string
      act2?: string
      act3?: string
    }
    urlOfText: string
  }
  capitules: ICapitule[]
  words?: string
  writtenWords?: string
  comments: any[]
  createAt: string
  updateAt: string
}
