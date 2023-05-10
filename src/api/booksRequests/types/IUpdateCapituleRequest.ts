export interface IUpdateCapituleRequest {
  bookId: string
  capituleId: string
  capitule: {
    objective?: string
    name?: string
    structure?: {
      act1?: string
      act2?: string
      act3?: string
    }
  }
}
