import { IError } from '@@types/errors/IError'

export interface IResolveEvent {
  resolved: boolean
  error?: IError
}
