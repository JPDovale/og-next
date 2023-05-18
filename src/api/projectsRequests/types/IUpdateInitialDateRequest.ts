export interface IUpdateInitialDateRequest {
  projectId: string
  body: {
    timeChrist: 'A.C.' | 'D.C.'
    initialDate: number
  }
}
