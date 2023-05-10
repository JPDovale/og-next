import { ICreateArchiveInBoxRequest } from '@api/boxesRequests/types/ICreateArchiveInBoxRequest'
import { ICreateBoxRequest } from '@api/boxesRequests/types/ICreateBoxRequest'
import { IBoxResponse } from '@api/responsesTypes/IBoxResponse'
import { ReactNode } from 'react'
import { IEditorTo } from '../../../@types/editores/IEditorTo'
import { IGenericObject } from '../../../@types/editores/IGenericObject'
import { ICreateCommentDTO } from '../../../api/dtos/ICreateNewCommentDTO'
import { ICreatePersonDTO } from '../../../api/dtos/ICreatePersonDTO'
import { IBooksResponse } from '../../../api/responsesTypes/IBooksResponse'
import {
  IObjective,
  IPersonsResponse,
} from '../../../api/responsesTypes/IPersonsResponse'
import { IUserResponse } from '../../../api/responsesTypes/IUserResponse'
import { IDeleteObjective } from './interfaceFunctions/IDeleteObjective'
import { ISaveImagesRequest } from '@api/boxesRequests/types/ISaveImagesRequest'
import { IDeleteArchiveBox } from './interfaceFunctions/IDeleteArchiveBox'
import { IDeleteImageInArchiveRequest } from '@api/boxesRequests/types/IDeleteImageInArchiveRequest'
import { IUpdateArchiveRequest } from '@api/boxesRequests/types/IUpdateArchiveRequest'
import { IUpdateBoxRequest } from '@api/boxesRequests/types/IUpdateBoxRequest'
import { ITimelineResponse } from '@api/responsesTypes/ITimelinesResponse'

export interface IProjectsContext {
  // projects: IProjectResponse[]
  users: IUserResponse[]
  persons: IPersonsResponse[]
  books: IBooksResponse[]
  boxes: IBoxResponse[]
  timelines: ITimelineResponse[]

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
  updatePerson: (person: ICreatePersonDTO, personId: string) => Promise<boolean>
  deleteObjective: ({
    objectiveId,
    personId,
  }: IDeleteObjective) => Promise<boolean>

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
