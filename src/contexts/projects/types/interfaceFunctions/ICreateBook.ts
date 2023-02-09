import { IProjectResponse } from '../../../../api/responsesTypes/IProjcetResponse'

interface INewBook {
  title: string
  subtitle?: string
  literaryGenere: string
  generes: Array<{ name: string }>
  isbn?: string
  words?: string
  writtenWords?: string
}

export interface ICreateBook {
  project: IProjectResponse
  newBook: INewBook
}
