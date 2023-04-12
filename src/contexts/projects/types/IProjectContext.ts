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
import { IProjectResponse } from '../../../api/responsesTypes/IProjectResponse'
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
import { IDeleteImageInArchiveRequest } from '@api/boxesRequests/types/IDeleteImageInArchiveRequest'
import { IUpdateArchiveRequest } from '@api/boxesRequests/types/IUpdateArchiveRequest'
import { IUpdateBoxRequest } from '@api/boxesRequests/types/IUpdateBoxRequest'
import { ITimelineResponse } from '@api/responsesTypes/ITimelinesResponse'

export interface IProjectsContext {
  loading: boolean
  projects: IProjectResponse[]
  users: IUserResponse[]
  persons: IPersonsResponse[]
  books: IBooksResponse[]
  boxes: IBoxResponse[]
  timelines: ITimelineResponse[]

  error: IError | undefined
  setError: (newState: IError | undefined) => void

  createProject: (project: ICreateProjectDTO) => Promise<boolean>
  updateImageProject: (projectId: string, file: File) => Promise<boolean>
  shareProject: (newShare: IShareProjectDTO) => Promise<boolean>
  updatePlot: (newPlot: IUpdatePlotDTO, projectId: string) => Promise<boolean>
  commentInPlot: (
    newComment: ICreateCommentDTO,
    projectId: string,
  ) => Promise<boolean>
  responseCommentInPlot: (
    newResponse: ICreateCommentDTO,
    projectId: string,
    commentId: string,
  ) => Promise<boolean>
  deleteProject: (projectId: string) => Promise<boolean>

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
  ) => Promise<boolean>
  responseCommentToPerson: (
    newResponse: ICreateCommentDTO,
    personId: string,
    commentId: string,
  ) => Promise<boolean>
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
  ) => Promise<boolean>
  unshareProject: (userEmail: string, projectId: string) => Promise<boolean>
  updatePerson: (person: ICreatePersonDTO, personId: string) => Promise<boolean>
  deleteImageProject: ({ projectId }: IDeleteImageProject) => Promise<boolean>
  deleteImagePerson: ({ personId }: IDeleteImagePerson) => Promise<boolean>
  quitProject: ({ projectId }: IQuitProject) => Promise<boolean>
  deleteObjective: ({
    objectiveId,
    personId,
  }: IDeleteObjective) => Promise<boolean>
  createBook: ({ newBook, project }: ICreateBook) => Promise<boolean>
  updateFrontCover: ({ bookId, file }: IUpdateFrontCover) => Promise<boolean>
  removeFrontCover: (bookId: string) => Promise<boolean>
  createCapitule: (capitule: ICreateCapituleRequest) => Promise<boolean>
  updateNameProject: ({
    name,
    projectId,
  }: IUpdateNameProject) => Promise<boolean>
  updateCapitule: (capitule: IUpdateCapituleRequest) => Promise<boolean>
  createScene: (scene: ICreateSceneRequest) => Promise<boolean>
  setSceneToComplete: (
    sceneToComplete: ISetSceneToCompleteRequest,
  ) => Promise<boolean>
  deleteScene: ({
    bookId,
    capituleId,
    sceneId,
  }: IDeleteSceneRequest) => Promise<boolean>
  reorderScenes: ({
    bookId,
    capituleId,
    sequenceFrom,
    sequenceTo,
  }: IReorderScenesRequest) => Promise<boolean>
  updateScene: (sceneUpdate: IUpdateSceneRequest) => Promise<boolean>
  deleteCapitule: ({
    bookId,
    capituleId,
  }: IDeleteCapituleRequest) => Promise<boolean>
  reorderCapitules: ({
    bookId,
    sequenceFrom,
    sequenceTo,
  }: IReorderCapitulesRequest) => Promise<boolean>

  addGenre: (genreRequest: IAddGenreRequest) => Promise<boolean>

  removeGenre: (genreRequest: IRemoveGenreRequest) => Promise<boolean>
  updateBook: (bookInfosUpdated: IUpdateBookRequest) => Promise<boolean>
  deleteBook: (bookId: string) => Promise<boolean>
  createBox: (box: ICreateBoxRequest) => Promise<boolean>
  createArchiveInBox: (archive: ICreateArchiveInBoxRequest) => Promise<boolean>
  saveArchiveImages: (images: ISaveImagesRequest) => Promise<boolean>
  deleteArchiveBox: ({
    archiveId,
    boxId,
  }: IDeleteArchiveBox) => Promise<boolean>
  deleteImageInArchive: ({
    archiveId,
    boxId,
    imageId,
  }: IDeleteImageInArchiveRequest) => Promise<boolean>
  updateArchive: ({
    archiveId,
    boxId,
    description,
    title,
  }: IUpdateArchiveRequest) => Promise<boolean>
  updateBox: ({
    boxId,
    name,
    description,
    tags,
  }: IUpdateBoxRequest) => Promise<boolean>
  deleteBox: (boxId: string) => Promise<boolean>
}

export interface IProjectsContextProps {
  children: ReactNode
}
