export interface ICreateSceneRequest {
  bookId: string
  capituleId: string
  objective: string
  structure: {
    act1: string
    act2: string
    act3: string
  }
  persons: string[]
}
