import { IComment } from './IProjectResponse'

export interface IObjectiveAvoiders {
  id: number
  persons?: Array<{ id: string; name: string; image_url: string | null }>
  _count?: {
    persons: number
  }
}

export interface IObjectiveSupporters {
  id: number
  persons?: Array<{ id: string; name: string; image_url: string | null }>
  _count?: {
    persons: number
  }
}
export interface IObjective {
  id: string
  title: string
  description: string
  it_be_realized: boolean
  created_at: Date
  avoiders_id: number | null
  supporters_id: number | null
  avoiders?: IObjectiveAvoiders | null
  supporters?: IObjectiveSupporters | null
  comments?: IComment[]
  persons?: Array<{ id: string; name: string; image_url: string | null }>
}

interface IConsequence {
  id: number
  title: string
  description: string
  created_at: Date
  personality_id: string | null
  trauma_id: string | null
}

export interface IPersonality {
  id: string
  title: string
  description: string
  created_at: Date
  consequences?: IConsequence[]
  persons?: Array<{ id: string; name: string; image_url: string | null }>
  comments?: IComment[]
}

export interface IAppearance {
  id: string
  title: string
  description: string
  created_at: Date
  persons?: Array<{ id: string; name: string; image_url: string | null }>
  comments?: IComment[]
}

export interface IDream {
  id: string
  title: string
  description: string
  created_at: Date
  persons?: Array<{ id: string; name: string; image_url: string | null }>
  comments?: IComment[]
}

export interface IFear {
  id: string
  title: string
  description: string
  created_at: Date
  persons?: Array<{ id: string; name: string; image_url: string | null }>
  comments?: IComment[]
}

export interface IWishe {
  id: string
  title: string
  description: string
  created_at: Date
  persons?: Array<{ id: string; name: string; image_url: string | null }>
  comments?: IComment[]
}

export interface ITrauma {
  id: string
  title: string
  description: string
  created_at: Date
  consequences?: IConsequence[]
  persons?: Array<{ id: string; name: string; image_url: string | null }>
  comments?: IComment[]
}

export interface IPower {
  id: string
  title: string
  description: string
  created_at: Date
  persons?: Array<{ id: string; name: string; image_url: string | null }>
  comments?: IComment[]
}

export interface ICoupleWithPerson {
  id: number
  created_at: Date
  person_id: string
  person: {
    id: string
    name: string
    image_url: string | null
  }
}

export interface ICouple {
  id: string
  title: string
  description: string
  until_end: boolean
  created_at: Date
  person_id: string
  coupleWithPerson: ICoupleWithPerson
  couple_with_person_id: number
  comments?: IComment[]
}

interface IException {
  id: number
  title: string
  description: string
  created_at: Date
  value_id: string | null
}

export interface IValue {
  id: string
  title: string
  description: string
  created_at: Date

  exceptions?: IException[]
  persons?: Array<{ id: string; name: string; image_url: string | null }>
  comments?: IComment[]
}

export interface IPersonsResponse {
  id: string
  name: string
  last_name: string
  age: number
  history: string
  created_at: Date
  updated_at: Date
  image_filename?: string | null
  image_url: string | null
  user_id?: string
  project_id?: string

  appearances?: IAppearance[]
  objectives?: IObjective[]
  personalities?: IPersonality[]
  dreams?: IDream[]
  fears?: IFear[]
  powers?: IPower[]
  couples?: ICouple[]
  coupleWithPersons?: ICoupleWithPerson[]
  values?: IValue[]
  wishes?: IWishe[]
  traumas?: ITrauma[]
  _count: {
    objectives: number
    dreams: number
    fears: number
    couples: number
    appearances: number
    personalities: number
    powers: number
    traumas: number
    values: number
    wishes: number
  }
}
