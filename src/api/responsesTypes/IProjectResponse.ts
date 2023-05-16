import { IBooksResponse } from './IBooksResponse'
import { IPersonsResponse } from './IPersonsResponse'

export interface IResponse {
  id: string
  content: string
  likes: number
  unlikes: number
  created_at: Date
  user_id: string
  comment_id: string
}

export interface IComment {
  id: string
  content: string
  to_unknown: string | null
  likes: number
  unlikes: number
  created_at: Date
  updated_at: Date
  user_id: string
  project_id: string | null
  objective_id: string | null
  personality_id: string | null
  appearance_id: string | null
  dream_id: string | null
  fear_id: string | null
  power_id: string | null
  couple_id: string | null
  value_id: string | null
  wishe_id: string | null
  trauma_id: string | null
  book_id: string | null
  capitule_id: string | null
  scene_id: string | null
  responses: IResponse[]
}

export interface IUserInProject {
  avatar_url?: string | null
  email?: string
  id: string
  username?: string
  name?: string
}

export interface IProjectUsers {
  users: IUserInProject[]
}

export type IKeysOfFeatures =
  | 'books'
  | 'plot'
  | 'planets'
  | 'nations'
  | 'persons'
  | 'citys'
  | 'races'
  | 'religions'
  | 'powers'
  | 'familys'
  | 'languages'
  | 'institutions'
  | 'timeLines'
export interface IFeatures {
  books: boolean
  plot: boolean
  planets: boolean
  nations: boolean
  persons: boolean
  citys: boolean
  races: boolean
  religions: boolean
  powers: boolean
  familys: boolean
  languages: boolean
  institutions: boolean
  timeLines: boolean
}
export interface IProjectResponse {
  id: string
  name: string
  private?: boolean
  password?: string | null
  type: string
  created_at: Date
  updated_at?: Date
  initial_date_timestamp: number
  initial_date: string
  initial_date_time_christ: 'A.C.' | 'D.C.'
  image_url: string | null
  image_filename?: string | null
  one_phrase?: string | null
  premise?: string | null
  storyteller?: string | null
  literary_genre?: string | null
  subgenre?: string | null
  ambient?: string | null
  count_time?: string | null
  historical_fact?: string | null
  details?: string | null
  summary?: string | null
  url_text?: string | null
  structure_act_1?: string | null
  structure_act_2?: string | null
  structure_act_3?: string | null
  users_with_access_view: IProjectUsers | null
  users_with_access_edit: IProjectUsers | null
  users_with_access_comment: IProjectUsers | null
  comments?: IComment[]
  user: IUserInProject
  books?: IBooksResponse[]
  persons?: IPersonsResponse[]
  features: IFeatures
  _count: {
    persons?: number
    books?: number
  }
}
