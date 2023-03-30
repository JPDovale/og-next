import { IAvatar } from './ICreateResponse'
import { IComment } from './IProjectResponse'

export interface IObjective {
  id?: string
  title?: string
  description?: string
  objectified: boolean
  avoiders: string[]
  supporting: string[]
}

interface IConsequence {
  title: string
  description: string
}

export interface IPersonality {
  id?: string
  title: string
  description: string
  consequences?: IConsequence[]
}

interface ICharacter {
  id?: string
  title: string
  description: string
}

export interface IAppearance {
  id?: string
  title: string
  description: string
  character?: ICharacter[]
  images?: string[]
}

export interface IDream {
  id?: string
  title: string
  description: string
}

export interface IFear {
  id?: string
  title: string
  description: string
}

export interface IWishe {
  id?: string
  title: string
  description: string
}

export interface ITrauma {
  id?: string
  title: string
  description: string
  consequences: IConsequence[]
}

export interface IPower {
  id?: string
  title: string
  description: string
}

export interface ICouple {
  id?: string
  personId: string
  title: string
  description: string
  final: boolean
}

interface IException {
  title: string
  description: string
}

export interface IValue {
  id?: string
  title: string
  description: string
  exceptions: IException[]
}

export interface IPersonsResponse {
  id: string
  fromUser: string
  name: string
  lastName: string
  age: string
  history: string
  defaultProject: string
  objectives: IObjective[]
  personality: IPersonality[]
  appearance: IAppearance[]
  powers: IPower[]
  dreams: IDream[]
  fears: IFear[]
  wishes: IWishe[]
  traumas: ITrauma[]
  couples: ICouple[]
  values: IValue[]
  image: IAvatar
  createAt: string
  updateAt: string
  comments: IComment[]
  errorMessage?: string
  errorTitle?: string
}
