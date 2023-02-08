export interface ICreateBookRequest {
  projectId: string
  title: string
  subtitle?: string
  authors: Array<{
    username?: string
    email?: string
    id?: string
  }>
  literaryGenere: string
  words?: string
  writtenWords?: string
  generes: Array<{
    name: string
  }>
  isbn?: string
}
