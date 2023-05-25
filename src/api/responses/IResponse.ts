export interface IResponseError {
  title: string
  message: string
  statusCode: number
}

export interface IResponseRedirect {
  title: 'Login failed'
  message: 'Login failed'
  statusCode: 401
}

export interface IResponse<TypeData = undefined> {
  ok: boolean
  data?: TypeData
  error?: IResponseError | IResponseRedirect
}
