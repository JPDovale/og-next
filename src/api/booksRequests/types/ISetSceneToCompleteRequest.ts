export interface ISetSceneToCompleteRequest {
  bookId: string
  capituleId: string
  completeInfos: {
    sceneId: string
    writtenWords: number
  }
}
