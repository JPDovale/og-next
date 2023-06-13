import { ICapitulePreview } from '../capitule/ICapitulePreview'
import { IComment } from '../IProjectResponse'

export interface IAuthor {
  id: number
  user: {
    id: string
    username: string
    email: string
    avatar: {
      url: string | undefined
      alt: string
    }
  }
}

export interface IGenre {
  name: string
  id: string
}

export interface IBook {
  id: string
  name: {
    title: string
    subtitle: string | null
    fullName: string
  }
  infos: {
    words: number
    writtenWords: number
    literaryGenre: string
    isbn: string
    createdAt: Date
    updatedAt: Date
    projectId: string
  }
  plot: {
    onePhrase: string | null
    premise: string | null
    storyteller: string | null
    ambient: string | null
    countTime: string | null
    historicalFact: string | null
    details: string | null
    summary: string | null
    urlText: string | null
    structure: {
      act1: string | null
      act2: string | null
      act3: string | null
    }
  }
  frontCover: {
    url: string | undefined
    alt: string
  }
  collections: {
    genre: {
      itensLength: number
      itens: IGenre[]
    }
    author: {
      itensLength: number
      itens: IAuthor[]
    }
    capitules: {
      itensLength: number
      itens: ICapitulePreview[]
    }
    comments: {
      itensLength: number
      itens: IComment[]
    }
  }
}

export interface IBookResponse {
  book: IBook
}
