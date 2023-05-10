import { IKeysPaths } from '../utils/keysPaths'

export interface ICreateObject<TypeObject> {
  path: IKeysPaths
  object: TypeObject
}
