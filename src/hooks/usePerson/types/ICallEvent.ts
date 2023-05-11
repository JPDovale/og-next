import { IUpdatePersonDTO } from '@api/dtos/IUpdatePersonDTO'
import { ICreateCommentObject } from './ICreateCommentObject'
import { ICreateObject } from './ICreateObject'
import { ICreateObjectReference } from './ICreateObjectReference'
import { ICreateResponseInPerson } from './ICreateResponseInPerson'
import { IResolveEvent } from './IResolveEvent'

export interface ICallEvent {
  updateImage: (file: File) => Promise<IResolveEvent>
  deleteImage: () => Promise<IResolveEvent>
  update: (newPersonsInfos: IUpdatePersonDTO) => Promise<IResolveEvent>
  delete: () => Promise<IResolveEvent>
  createObject: <TypeObject>(
    newObjectTo: ICreateObject<TypeObject>,
  ) => Promise<IResolveEvent>
  createObjectReference: (
    newReference: ICreateObjectReference,
  ) => Promise<IResolveEvent>
  commentInPerson: (
    newCommentObject: ICreateCommentObject,
  ) => Promise<IResolveEvent>
  responseCommentInPerson: (
    newResponse: ICreateResponseInPerson,
  ) => Promise<IResolveEvent>
}
