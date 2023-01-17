import { Dispatch } from 'react'
import { IError } from '../../../@types/errors/IError'
import { api } from '../../../api'
import { INewInitializeDTO } from '../../../api/dtos/INewInitializeDTO'
import { initializeUserRequest } from '../../../api/userRequest'
import { setErrorAction, setUserAction } from '../reducer/actionsUserReducer'

export async function initializeUserFunction(
  newUser: INewInitializeDTO,
  dispatch: Dispatch<any>,
): Promise<boolean> {
  const createdUser = await initializeUserRequest(newUser)

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
