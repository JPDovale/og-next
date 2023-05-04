export interface IReorderScenesRequest {
  bookId: string
  capituleId: string
  sequences: {
    sequenceFrom: number
    sequenceTo: number
  }
}
