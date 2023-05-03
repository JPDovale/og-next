export interface IUpdateBookRequest {
  updatedBook: {
    words?: string | null
    title?: string | null
    subtitle?: string | null
    isbn?: string | null
    literaryGenere?: string | null
  }

  bookId: string
}
