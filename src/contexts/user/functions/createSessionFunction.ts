import { Dispatch } from 'react'
import { IError } from '../../../@types/errors/IError'
import { INewSessionDTO } from '../../../api/dtos/INewSessionDTO'
import { createSessionRequest } from '../../../api/userRequest'
import {
  setErrorAction,
  setLoadingAction,
  setUserAction,
} from '../reducer/actionsUserReducer'

export async function createSessionFunction(
  newSession: INewSessionDTO,
  dispatch: Dispatch<any>,
): Promise<boolean> {
  dispatch(setLoadingAction(true))

  const logged = await createSessionRequest(
    newSession.email,
    newSession.password,
  )

  if (logged.errorTitle) {
    const error: IError = {
      title: logged.errorTitle,
      message: logged.errorMessage as string,
    }

    dispatch(setErrorAction(error))
    return false
  }

  dispatch(setUserAction(logged.user))
  return true
}
