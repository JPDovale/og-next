/* eslint-disable no-unused-vars */
import { IError } from '../../../@types/errors/IError'
import { ISuccess } from '../../../@types/success/ISuccess'
import { IUserResponse } from '../../../api/responsesTypes/IUserResponse'

export enum UserActionsType {
  SetUser = 'setUser',

  SetError = 'setError',
  SetSuccess = 'setSuccess',
  SetLoading = 'setLoading',
}

export function setUserAction(user: IUserResponse | null) {
  return {
    type: UserActionsType.SetUser,
    payload: {
      user,
    },
  }
}

export function setErrorAction(error: IError | null) {
  return {
    type: UserActionsType.SetError,
    payload: {
      error,
    },
  }
}

export function setSuccessAction(success: ISuccess | null) {
  return {
    type: UserActionsType.SetSuccess,
    payload: {
      success,
    },
  }
}

export function setLoadingAction(newState: boolean) {
  return {
    type: UserActionsType.SetLoading,
    payload: {
      loading: newState,
    },
  }
}
