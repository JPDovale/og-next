export interface IDateResponse {
  id: string
  dateDif: number
  hour: string
  day: string
  month: string
  year: string
  fullDate: string
  referenceId: string
  event: {
    title: string
    description: string
    persons: string[]
  }
}

export type IToTypeTimeline = 'project' | 'person'

export interface ITimelineResponse {
  id: string
  projectId: string
  userId: string
  to: string
  toType: IToTypeTimeline | string
  dates: IDateResponse[]
  createdAt: string
  updatedAt: string
}
