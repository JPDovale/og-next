import produce from 'immer'
import LogRocket from 'logrocket'
import { IError } from '../../../@types/errors/IError'
import { ISuccess } from '../../../@types/success/ISuccess'
import { IUserResponse } from '../../../api/responsesTypes/IUserResponse'
import { UserActionsType } from './actionsUserReducer'

export interface IUserInfos {
  error: IError | undefined
  user: IUserResponse | undefined
  success: ISuccess | undefined
}

export function userReducer(state: IUserInfos, action: any) {
  switch (action.type) {
    case UserActionsType.SetUser: {
      if (action.payload.user) {
        LogRocket.identify(action.payload.user.id, {
          name: action.payload.user.name,
          email: action.payload.user.email,

          // Add your own custom user variables here, ie:
          subscriptionType: 'trail',
        })
      }

      return produce(state, (draft) => {
        draft.user = action.payload.user
        draft.error = undefined
      })
    }

    case UserActionsType.SetError: {
      return produce(state, (draft) => {
        draft.error = action.payload.error
      })
    }

    case UserActionsType.SetSuccess: {
      return produce(state, (draft) => {
        draft.success = action.payload.success
        draft.error = undefined
      })
    }

    default:
      return state
  }
}
