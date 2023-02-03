import { ReactNode } from 'react'
import { IEditorTo } from '../../../@types/editores/IEditorTo'
import { IGenericObject } from '../../../@types/editores/IGenericObject'
import { IError } from '../../../@types/errors/IError'
import { ICreateCommentDTO } from '../../../api/dtos/ICreateNewCommentDTO'
import { ICreatePersonDTO } from '../../../api/dtos/ICreatePersonDTO'
import { ICreateProjectDTO } from '../../../api/dtos/ICreateProjectDTO'
import { IShareProjectDTO } from '../../../api/dtos/IShareProjectDTO'
import { IUpdatePlotDTO } from '../../../api/dtos/IUpdatePlotDTO'
import { IBooksResponse } from '../../../api/responsesTypes/IBooksResponse'
import {
  IObjective,
  IPersonsResponse,
} from '../../../api/responsesTypes/IPersonsResponse'
import { IProjectResponse } from '../../../api/responsesTypes/IProjcetResponse'
import { IUserResponse } from '../../../api/responsesTypes/IUserResponse'
import { ICreateBook } from './interfaceFunctions/ICreateBook'
import { IDeleteImagePerson } from './interfaceFunctions/IDeleteImagePerson'
import { IDeleteImageProject } from './interfaceFunctions/IDeleteImageProject'
import { IDeleteObjective } from './interfaceFunctions/IDeleteObjective'
import { IQuitProject } from './interfaceFunctions/IQuitProject'

export interface IProjectsContext {
  loading: boolean
  projects: IProjectResponse[]
  users: IUserResponse[]
  persons: IPersonsResponse[]
  books: IBooksResponse[]

  error: IError | undefined
  setError: (newState: IError | undefined) => void

  createProject: (project: ICreateProjectDTO) => Promise<string | void>
  updateImageProject: (projectId: string, file: File) => Promise<boolean>
  shareProject: (newShare: IShareProjectDTO) => Promise<boolean>
  updatePlot: (newPlot: IUpdatePlotDTO, projectId: string) => Promise<void>
  commentInPlot: (
    newComment: ICreateCommentDTO,
    projectId: string,
  ) => Promise<void>
  responseCommentInPlot: (
    newResponse: ICreateCommentDTO,
    projectId: string,
    commentId: string,
  ) => Promise<void>
  deleteProject: (projectId: string) => Promise<void>

  createNewPerson: (person: ICreatePersonDTO) => Promise<boolean>
  updateImageFromPerson: (personId: string, file: File) => Promise<boolean>
  updateObjective: (
    objective: IObjective,
    personId: string,
    objectiveId: string,
  ) => Promise<boolean>
  createObjective: (
    objective: IObjective,
    personId: string,
    projectId: string,
  ) => Promise<boolean>
  saveRefObjective: (
    objective: IObjective,
    personId: string,
    projectId: string,
    refId: string,
  ) => Promise<boolean>
  commentInPerson: (
    newComment: ICreateCommentDTO,
    personId: string,
  ) => Promise<void>
  responseCommentToPerson: (
    newResponse: ICreateCommentDTO,
    personId: string,
    commentId: string,
  ) => Promise<void>
  createObjectGeneric: (
    generic: IGenericObject,
    to: IEditorTo,
    personId: string,
    projectId: string,
  ) => Promise<boolean>

  saveRefObjectGeneric: (
    personId: string,
    projectId: string,
    refId: string,
    to: IEditorTo,
    subObjects?: Array<{
      title: string
      description: string
    }>,
  ) => Promise<boolean>

  updateObjectGeneric: (
    generic: IGenericObject,
    personId: string,
    genericId: string,
    to: IEditorTo,
  ) => Promise<boolean>

  deleteObjectGeneric: (
    generic: IGenericObject,
    personId: string,
    genericId: string,
    to: IEditorTo,
  ) => Promise<void>
  unshareProject: (userEmail: string, projectId: string) => Promise<void>
  updatePerson: (person: ICreatePersonDTO, personId: string) => Promise<void>
  deleteImageProject: ({ projectId }: IDeleteImageProject) => Promise<void>
  deleteImagePerson: ({ personId }: IDeleteImagePerson) => Promise<void>
  quitProject: ({ projectId }: IQuitProject) => Promise<void>
  deleteObjective: ({
    objectiveId,
    personId,
  }: IDeleteObjective) => Promise<void>
  createBook: ({ newBook, project }: ICreateBook) => Promise<boolean>
}

export interface IProjectsContextProps {
  children: ReactNode
}
