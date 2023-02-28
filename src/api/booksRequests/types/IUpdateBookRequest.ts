export interface IUpdateBookRequest {
  words?: string | null
  title?: string | null
  subtitle?: string | null
  isbn?: string | null
  literaryGenere?: string | null
  bookId: string
}
