import { ICreateProjectDTO } from '@api/dtos/ICreateProjectDTO'
import { IResolveEvent } from './IResolveEvent'

export interface ICallEvent {
  createProject: (newProject: ICreateProjectDTO) => Promise<IResolveEvent>
}
