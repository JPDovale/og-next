import { Dispatch } from 'react'
import { deleteAvatarRequest } from '../../../api/userRequest'
import { setUserAction } from '../reducer/actionsUserReducer'
import { refreshSessionFunction } from './refreshSessionFunction'

export async function deleteAvatarFunction(
  dispatch: Dispatch<any>,
): Promise<any> {
  const updatedUser = await deleteAvatarRequest()

  if (updatedUser?.errorMessage === 'Invalid token') {
    const isRefreshed = await refreshSessionFunction()

    if (isRefreshed) {
      return deleteAvatarFunction(dispatch)
    }
    return
  }

  dispatch(setUserAction(updatedUser))
}
