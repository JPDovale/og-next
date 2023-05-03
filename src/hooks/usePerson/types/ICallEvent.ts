import { IResolveEvent } from './IResolveEvent'

export interface ICallEvent {
  updateImage: (file: File) => Promise<IResolveEvent>
  deleteImage: () => Promise<IResolveEvent>
}
