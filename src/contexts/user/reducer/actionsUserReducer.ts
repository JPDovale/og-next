/* eslint-disable no-unused-vars */
import { IError } from '../../../@types/errors/IError'
import { ISuccess } from '../../../@types/success/ISuccess'
import { IUserResponse } from '../../../api/responsesTypes/IUserResponse'

export enum UserActionsType {
  SetUser = 'setUser',

  SetError = 'setError',
  SetSuccess = 'setSuccess',
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

export function setSuccessAction(success: ISuccess | undefined) {
  return {
    type: UserActionsType.SetSuccess,
    payload: {
      success,
    },
  }
}
