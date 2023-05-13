import { IError } from '@@types/errors/IError'

export interface IResolveEvent<TypeResult = undefined> {
  resolved: boolean
  result?: TypeResult
  error?: IError
}
