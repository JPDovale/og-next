import { IAvatar } from './ICreateResponse'

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
  capitules: any[]
  words?: string
  writtenWords?: string
  comments: any[]
  createAt: string
  updateAt: string
}
