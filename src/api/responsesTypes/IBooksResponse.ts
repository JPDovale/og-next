import { IPersonsResponse } from './IPersonsResponse'
import { IComment } from './IProjectResponse'

export interface IScene {
  id: string
  sequence: number
  complete: boolean
  objective: string
  written_words: number
  structure_act_1: string
  structure_act_2: string
  structure_act_3: string
  capitule_id: string

  persons: IPersonsResponse[]
  comments: IComment[]
}

export interface ICapitule {
  id: string
  name: string
  sequence: number
  objective: string
  complete: boolean
  words: number
  structure_act_1: string | null
  structure_act_2: string | null
  structure_act_3: string | null
  created_at: Date
  book_id: string
  scenes: IScene[]
  comments: IComment[]
  _count: {
    scenes: number
    comments: number
  }
}

export interface IAuthor {
  id: number
  user: {
    id: string
    avatar_url: string | null
    username: string
    email: string
  }
}

export interface IGenre {
  id: string
  name: string
  created_at: Date
}

export interface IBooksResponse {
  id: string
  title: string
  subtitle: string | null
  literary_genre: string
  isbn: string | null
  front_cover_filename?: string | null
  front_cover_url: string | null
  words: number
  written_words: number
  one_phrase?: string | null
  premise?: string | null
  storyteller?: string | null
  ambient?: string | null
  count_time?: string | null
  historical_fact?: string | null
  details?: string | null
  summary?: string | null
  url_text?: string | null
  structure_act_1?: string | null
  structure_act_2?: string | null
  structure_act_3?: string | null
  created_at: Date
  updated_at: Date
  user_id?: string
  project_id?: string
  _count: {
    genres: number
    authors: number
    capitules: number
  }
  genres?: IGenre[]
  authors?: IAuthor[]
  capitules?: ICapitule[]
  comments?: IComment[]
}
