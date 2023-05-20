import { ICreateTimeEventDTO } from './../../../api/dtos/timeLinesDTOS/ICreateTimeEventDTO'
import { ICreateBookDTO } from '@api/dtos/booksDTOS/ICreateBookDTO'
import { ICreateCommentDTO } from '@api/dtos/ICreateNewCommentDTO'
import { ICreatePersonDTO } from '@api/dtos/ICreatePersonDTO'
import { IShareProjectDTO } from '@api/dtos/IShareProjectDTO'
import { IUpdatePlotDTO } from '@api/dtos/IUpdatePlotDTO'
import { IFeatures } from '@api/responsesTypes/IProjectResponse'
import { IResolveEvent } from './IResolveEvent'
import { IResponseComment } from './IResponseComment'
import { IUpdateInitialDate } from './IUpdateInitialDate'

export interface ICallEvent {
  delete: () => Promise<IResolveEvent>
  quit: () => Promise<IResolveEvent>
  share: (shareInfos: IShareProjectDTO) => Promise<IResolveEvent>
  updatePlot: (plotUpdate: IUpdatePlotDTO) => Promise<IResolveEvent>
  updateName: (newName: string) => Promise<IResolveEvent>
  updateImage: (file: File) => Promise<IResolveEvent>
  unshare: (email: string) => Promise<IResolveEvent>
  removeImage: () => Promise<IResolveEvent>
  commentInPlot: (newComment: ICreateCommentDTO) => Promise<IResolveEvent>
  responseCommentInPlot: (
    newResponse: IResponseComment,
  ) => Promise<IResolveEvent>
  createPerson: (newPerson: ICreatePersonDTO) => Promise<IResolveEvent>
  createBook: (newBook: ICreateBookDTO) => Promise<IResolveEvent>
  changeFeaturesUsing: (features: IFeatures) => Promise<IResolveEvent>
  updateInitialDate: (newDate: IUpdateInitialDate) => Promise<IResolveEvent>
  createTimeEventOnMainTimeLien: (
    timeEvent: ICreateTimeEventDTO,
  ) => Promise<IResolveEvent>
  copyTimeLineToProject: (timeLineId: string) => Promise<IResolveEvent>
  changeDoneTimeEvent: (
    timeEventId: string,
    timeLineId: string,
  ) => Promise<IResolveEvent>
}
