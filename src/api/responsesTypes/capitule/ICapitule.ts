import { IPersonsResponse } from '../IPersonsResponse'

export interface IScene {
  id: string
  infos: {
    complete: boolean
    sequence: number
    writtenWords: number
    objective: string
  }
  structure: {
    act1: string
    act2: string
    act3: string
  }
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
  collections: {
    persons: {
      itensLength: number
      itens: IPersonsResponse[]
    }
  }
}

export interface ICapitule {
  id: string
  name: string
  infos: {
    complete: boolean
    sequence: number
    words: number
    objective: string
    projectId: string
    bookId: string
  }
  structure: {
    act1: string | null
    act2: string | null
    act3: string | null
  }
  collections: {
    scene: {
      itensLength: number
      itens: IScene[]
    }
  }
}

export interface ICapituleResponse {
  capitule: ICapitule
}
