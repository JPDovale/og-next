export interface ICreateCapituleRequest {
  bookId: string
  objective: string
  name: string
  structure?: {
    act1?: string
    act2?: string
    act3?: string
  }
}
