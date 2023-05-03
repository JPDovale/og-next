import { ICreateCapitule } from './ICreateCapitule'
import { IResolveEvent } from './IResolveEvent'
import { IReorderCapitules } from './IRorderCapitules'
import { IUpdateBook } from './IUpdateBook'

export interface ICallEvent {
  updateFrontCover: (file: File) => Promise<IResolveEvent>
  removeFrontCover: () => Promise<IResolveEvent>
  addGenre: (genre: string) => Promise<IResolveEvent>
  removeGenre: (genreId: string) => Promise<IResolveEvent>
  delete: () => Promise<IResolveEvent>
  update: (infos: IUpdateBook) => Promise<IResolveEvent>
  createCapitule: (newCapitule: ICreateCapitule) => Promise<IResolveEvent>
  reorderCapitules: (reorder: IReorderCapitules) => Promise<IResolveEvent>
}
