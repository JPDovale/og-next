import produce from 'immer'
import { IError } from '../../../@types/errors/IError'
import { ISuccess } from '../../../@types/success/ISuccess'
import { IUserResponse } from '../../../api/responsesTypes/IUserResponse'
import { UserActionsType } from './actionsUserReducer'

export interface IUserInfos {
  error: IError | null
  user: IUserResponse | null
  success: ISuccess | null
  loading: boolean
}

export function userReducer(state: IUserInfos, action: any) {
  switch (action.type) {
    case UserActionsType.SetUser: {
      return produce(state, (draft) => {
        draft.user = action.payload.user
        draft.error = null
        draft.loading = false
      })
    }

    case UserActionsType.SetError: {
      return produce(state, (draft) => {
        draft.error = action.payload.error
        draft.loading = false
      })
    }

    case UserActionsType.SetSuccess: {
      return produce(state, (draft) => {
        draft.success = action.payload.success
        draft.error = null
        draft.loading = false
      })
    }

    case UserActionsType.SetLoading: {
      return produce(state, (draft) => {
        draft.loading = action.payload.loading
      })
    }

    default:
      return state
  }
}
