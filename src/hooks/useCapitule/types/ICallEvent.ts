import { ICreateScene } from './ICreateScene'
import { IResolveEvent } from './IResolveEvent'
import { IReorderScenes } from './IRorderScenes'
import { ISetSceneToComplete } from './ISetSceneToComplete'
import { IUpdateCapitule } from './IUpdateCapitule'
import { IUpdateScene } from './IUpdateScene'

export interface ICallEvent {
  update: (capitule: IUpdateCapitule) => Promise<IResolveEvent>
  delete: () => Promise<IResolveEvent>
  createScene: (newScene: ICreateScene) => Promise<IResolveEvent>
  updateScene: (scene: IUpdateScene) => Promise<IResolveEvent>
  setSceneToComplete: (
    completeInfos: ISetSceneToComplete,
  ) => Promise<IResolveEvent>
  reorderScenes: (sequences: IReorderScenes) => Promise<IResolveEvent>
  deleteScene: (sceneId: string) => Promise<IResolveEvent>
}
