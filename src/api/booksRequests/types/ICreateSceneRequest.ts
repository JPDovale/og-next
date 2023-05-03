export interface ICreateSceneRequest {
  bookId: string
  capituleId: string
  scene: {
    objective: string
    structure: {
      act1: string
      act2: string
      act3: string
    }
    persons: { id: string }[]
  }
}
