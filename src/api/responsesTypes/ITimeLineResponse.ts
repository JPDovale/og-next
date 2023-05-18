export interface ITimeEventBorn {
  id: number
  person: {
    id: string
  }
}

export interface ITimeEvent {
  id: string
  title: string
  description: string
  happened_date_timestamp: string
  happened_year: string
  happened_year_time_christ: string
  happened_month: string
  happened_date: string
  happened_day: number
  happened_hour: number
  happened_minute: number
  happened_second: number
  importance: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
  created_at: Date
  updated_at: Date
  time_line_id: string
  scene_id: string | null
  timeEventBorn: ITimeEventBorn | null
}

export interface ITimeLineResponse {
  id: string
  title: string | null
  description: string | null
  is_alternative: boolean
  created_at: Date
  project_id: string
  user_id: string
  timeEvents: ITimeEvent[]
  _count?: {
    timeEvents?: number
  }
}
