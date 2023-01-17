import { Dispatch } from 'react'
import { IError } from '../../../@types/errors/IError'
import { api } from '../../../api'
import { ICreateUserDTO } from '../../../api/dtos/ICreateUserDTO'
import { createUserRequest } from '../../../api/userRequest'
import { setErrorAction, setUserAction } from '../reducer/actionsUserReducer'

export async function createUserFunction(
  newUser: ICreateUserDTO,
  dispatch: Dispatch<any>,
): Promise<boolean> {
  const createdUser = await createUserRequest(newUser)

  if (createdUser.errorTitle) {
    const error: IError = {
      title: createdUser.errorTitle,
      message: createdUser.errorMessage as string,
    }

    dispatch(setErrorAction(error))
    return false
  }

  localStorage.setItem(
    '@og-user-refreshToken',
    JSON.stringify(createdUser.refreshToken),
  )
  localStorage.setItem('@og-user-token', JSON.stringify(createdUser.token))

  api.defaults.headers.Authorization = `Bearer ${createdUser.token}`

  dispatch(setUserAction(createdUser.user))
  return true
}
