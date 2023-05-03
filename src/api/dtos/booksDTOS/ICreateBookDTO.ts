export interface ICreateBookDTO {
  title: string
  subtitle?: string
  authors: Array<{
    user_id: string
  }>
  literaryGenre: string
  isbn?: string
  words?: number
  writtenWords?: number
}
