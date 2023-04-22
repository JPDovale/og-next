import { IUpdateBookRequest } from '@api/booksRequests/types/IUpdateBookRequest'
import { IResolveEvent } from './IResolveEvent'

export interface ICallEvent {
  updateFrontCover: (file: File) => Promise<IResolveEvent>
  removeFrontCover: () => Promise<IResolveEvent>
  addGenre: (genre: string) => Promise<IResolveEvent>
  removeGenre: (genre: string) => Promise<IResolveEvent>
  delete: () => Promise<IResolveEvent>
  update: (infos: IUpdateBookRequest) => Promise<IResolveEvent>
}
