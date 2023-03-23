import { ICreateArchiveInBoxRequest } from '@api/boxesRequests/types/ICreateArchiveInBoxRequest'
import { IAddGenreRequest } from '@api/booksRequests/types/IAddGenreRequest'
import { IDeleteCapituleRequest } from '@api/booksRequests/types/IDeleteCapituleRequest'
import { IRemoveGenreRequest } from '@api/booksRequests/types/IRemoveGenreRequest'
import { IReorderCapitulesRequest } from '@api/booksRequests/types/IReorderCapitulesRequest'
import { IUpdateBookRequest } from '@api/booksRequests/types/IUpdateBookRequest'
import { ICreateBoxRequest } from '@api/boxesRequests/types/ICreateBoxRequest'
import { IBoxResponse } from '@api/responsesTypes/IBoxResponse'
import { ReactNode } from 'react'
import { IEditorTo } from '../../../@types/editores/IEditorTo'
import { IGenericObject } from '../../../@types/editores/IGenericObject'
import { IError } from '../../../@types/errors/IError'
import { ICreateCapituleRequest } from '../../../api/booksRequests/types/ICreateCapituleRequest'
import { ICreateSceneRequest } from '../../../api/booksRequests/types/ICreateSceneRequest'
import { IDeleteSceneRequest } from '../../../api/booksRequests/types/IDeleteSceneRequest'
import { IReorderScenesRequest } from '../../../api/booksRequests/types/IReorderScenesRequest'
import { ISetSceneToCompleteRequest } from '../../../api/booksRequests/types/ISetSceneToCompleteRequest'
import { IUpdateCapituleRequest } from '../../../api/booksRequests/types/IUpdateCapituleRequest'
import { IUpdateSceneRequest } from '../../../api/booksRequests/types/IUpdateSceneRequest'
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
import { IUpdateFrontCover } from './interfaceFunctions/IUpdateFrontCover'
import { IUpdateNameProject } from './interfaceFunctions/IUpdateNameProject'
import { ISaveImagesRequest } from '@api/boxesRequests/types/ISaveImagesRequest'
import { IDeleteArchiveBox } from './interfaceFunctions/IDeleteArchiveBox'

export interface IProjectsContext {
  loading: boolean
  projects: IProjectResponse[]
  users: IUserResponse[]
  persons: IPersonsResponse[]
  books: IBooksResponse[]
  boxes: IBoxResponse[]

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
  updateFrontCover: ({ bookId, file }: IUpdateFrontCover) => Promise<void>
  removeFrontCover: (bookId: string) => Promise<void>
  createCapitule: (capitule: ICreateCapituleRequest) => Promise<boolean>
  updateNameProject: ({ name, projectId }: IUpdateNameProject) => Promise<void>
  updateCapitule: (capitule: IUpdateCapituleRequest) => Promise<void>
  createScene: (scene: ICreateSceneRequest) => Promise<boolean>
  setSceneToComplete: (
    sceneToComplete: ISetSceneToCompleteRequest,
  ) => Promise<boolean>
  deleteScene: ({
    bookId,
    capituleId,
    sceneId,
  }: IDeleteSceneRequest) => Promise<void>
  reorderScenes: ({
    bookId,
    capituleId,
    sequenceFrom,
    sequenceTo,
  }: IReorderScenesRequest) => Promise<void>
  updateScene: (sceneUpdate: IUpdateSceneRequest) => Promise<boolean>
  deleteCapitule: ({
    bookId,
    capituleId,
  }: IDeleteCapituleRequest) => Promise<boolean>
  reorderCapitules: ({
    bookId,
    sequenceFrom,
    sequenceTo,
  }: IReorderCapitulesRequest) => Promise<void>

  addGenre: (genreRequest: IAddGenreRequest) => Promise<void>

  removeGenre: (genreRequest: IRemoveGenreRequest) => Promise<void>
  updateBook: (bookInfosUpdated: IUpdateBookRequest) => Promise<void>
  deleteBook: (bookId: string) => Promise<boolean>
  createBox: (box: ICreateBoxRequest) => Promise<boolean>
  createArchiveInBox: (archive: ICreateArchiveInBoxRequest) => Promise<boolean>
  saveArchiveImages: (images: ISaveImagesRequest) => Promise<boolean>
  deleteArchiveBox: ({
    archiveId,
    boxId,
  }: IDeleteArchiveBox) => Promise<boolean>
}

export interface IProjectsContextProps {
  children: ReactNode
}
