import { Dispatch } from 'react'
import { IError } from '../../../@types/errors/IError'
import { ICreateUserDTO } from '../../../api/dtos/ICreateUserDTO'
import { createUserRequest } from '../../../api/userRequest'
import {
  setErrorAction,
  setLoadingAction,
  setUserAction,
} from '../reducer/actionsUserReducer'

export async function createUserFunction(
  newUser: ICreateUserDTO,
  dispatch: Dispatch<any>,
): Promise<boolean> {
  dispatch(setLoadingAction(true))
  const createdUser = await createUserRequest(newUser)

  if (createdUser.errorTitle) {
    const error: IError = {
      title: createdUser.errorTitle,
      message: createdUser.errorMessage as string,
    }

    dispatch(setErrorAction(error))
    return false
  }

  dispatch(setUserAction(createdUser.user))
  return true
}
