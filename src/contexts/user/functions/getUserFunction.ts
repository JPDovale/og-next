import { IUserResponse } from '@api/responsesTypes/IUserResponse'
import { responseDealings } from '@services/responseDealings'
import { Dispatch } from 'react'
import { getUserRequest } from '../../../api/userRequest'
import { setUserAction } from '../reducer/actionsUserReducer'

export async function getUserFunction(
  dispatch: Dispatch<any>,
): Promise<boolean> {
  const response = await getUserRequest()

  const handledAnswer = await responseDealings({
    response,
    dispatch,
    into: 'user',
    callback: () => getUserFunction(dispatch),
  })

  if (handledAnswer === false) return false

  const user = response.user as IUserResponse

  dispatch(setUserAction(user))
  return true
}
