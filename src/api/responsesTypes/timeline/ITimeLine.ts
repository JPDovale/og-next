import { IScene } from '../IBooksResponse'

export interface ITimeEventBorn {
  id: number
  person: {
    id: string
  }
}

export interface ITimeEventToDo {
  id: number
  completed_at: Date | null
}

export interface ITimeEvent {
  id: string
  title: string
  description: string
  happened: {
    timestamp: number
    year: string
    month: string
    day: number
    hour: number
    minute: number
    second: number
    timeChrist: 'A.C.' | 'D.C.'
    fullDate: string
  }
  infos: {
    importance: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
    createdAt: Date
    updatedAt: Date
  }
  collections: {
    person: {
      itensLength: number
      itens: Array<{
        id: string
      }>
    }
    scene: IScene | null
    timeEventBorn: ITimeEventBorn | null
    timeEventToDo: ITimeEventToDo | null
  }
}

export interface ITimeLine {
  id: string
  title: string | null
  description: string | null
  infos: {
    isAlternative: boolean
    createAt: Date
    type: string
  }
  dates: {
    startDate: Date
    endDate: Date
  } | null
  collections: {
    timeEvent: {
      itensLength: number
      itens: ITimeEvent[]
    }
  }
}
