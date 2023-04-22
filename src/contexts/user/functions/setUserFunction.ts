import { setUserAction } from '../reducer/actionsUserReducer'
import { Dispatch } from 'react'
import { IUserResponse } from '@api/responsesTypes/IUserResponse'

export function setUserFunction(
  loggedUser: IUserResponse | null,
  dispatch: Dispatch<any>,
) {
  dispatch(setUserAction(loggedUser))
}
