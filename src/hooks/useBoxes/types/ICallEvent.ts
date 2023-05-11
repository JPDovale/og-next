import { ISaveImagesRequest } from '@api/boxesRequests/types/ISaveImagesRequest'
import { ICreateArchiveInBoxRequest } from '@api/boxesRequests/types/ICreateArchiveInBoxRequest'
import { ICreateBoxRequest } from '@api/boxesRequests/types/ICreateBoxRequest'
import { IResolveEvent } from './IResolveEvent'
import { IDeleteImageInArchiveRequest } from '@api/boxesRequests/types/IDeleteImageInArchiveRequest'
import { IDeleteArchiveBoxRequest } from '@api/boxesRequests/types/IDeleteArchiveBoxRequest'
import { IUpdateArchiveRequest } from '@api/boxesRequests/types/IUpdateArchiveRequest'
import { IUpdateBoxRequest } from '@api/boxesRequests/types/IUpdateBoxRequest'

export interface ICallEvent {
  create: (newBox: ICreateBoxRequest) => Promise<IResolveEvent>
  createArchive: (
    newArchive: ICreateArchiveInBoxRequest,
  ) => Promise<IResolveEvent>
  saveImageInArchive: (newImage: ISaveImagesRequest) => Promise<IResolveEvent>
  removeImage: (image: IDeleteImageInArchiveRequest) => Promise<IResolveEvent>
  deleteArchive: (archive: IDeleteArchiveBoxRequest) => Promise<IResolveEvent>
  updateArchive: (archive: IUpdateArchiveRequest) => Promise<IResolveEvent>
  updateBox: (box: IUpdateBoxRequest) => Promise<IResolveEvent>
  deleteBox: (boxId: string) => Promise<IResolveEvent>
}
