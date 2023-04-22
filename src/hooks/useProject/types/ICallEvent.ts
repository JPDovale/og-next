import { ICreateBookDTO } from '@api/dtos/booksDTOS/ICreateBookDTO'
import { IShareProjectDTO } from '@api/dtos/IShareProjectDTO'
import { IUpdatePlotDTO } from '@api/dtos/IUpdatePlotDTO'
import { IResolveEvent } from '@hooks/useProjects/types/IResolveEvent'

export interface ICallEvent {
  delete: () => Promise<IResolveEvent>
  quit: () => Promise<IResolveEvent>
  share: (shareInfos: IShareProjectDTO) => Promise<IResolveEvent>
  updatePlot: (plotUpdate: IUpdatePlotDTO) => Promise<IResolveEvent>
  updateName: (newName: string) => Promise<IResolveEvent>
  updateImage: (file: File) => Promise<IResolveEvent>
  unshare: (email: string) => Promise<IResolveEvent>
  removeImage: () => Promise<IResolveEvent>

  createBook: (newBook: ICreateBookDTO) => Promise<IResolveEvent>
}
