/* eslint-disable no-unused-vars */
import { IError } from '../../../@types/errors/IError'
import { IUserResponse } from '../../../api/responsesTypes/IUserResponse'

export enum UserActionsType {
  SetUser = 'setUser',

  SetError = 'setError',
}

export function setUserAction(user: IUserResponse | undefined) {
  return {
    type: UserActionsType.SetUser,
    payload: {
      user,
    },
  }
}

export function setErrorAction(error: IError | undefined) {
  return {
    type: UserActionsType.SetError,
    payload: {
      error,
    },
  }
}
