import { ICreateScene } from './ICreateScene'
import { IResolveEvent } from './IResolveEvent'
import { IUpdateCapitule } from './IUpdateCapitule'
import { IUpdateScene } from './IUpdateScene'

export interface ICallEvent {
  update: (capitule: IUpdateCapitule) => Promise<IResolveEvent>
  delete: () => Promise<IResolveEvent>
  createScene: (newScene: ICreateScene) => Promise<IResolveEvent>
  updateScene: (scene: IUpdateScene) => Promise<IResolveEvent>
}
