import { Dispatch } from 'react'
import { ICreateCommentDTO } from '../../../../api/dtos/ICreateNewCommentDTO'
import { commentInPersonRequest } from '../../../../api/personsRequests'
import { IPersonsResponse } from '../../../../api/responsesTypes/IPersonsResponse'
import { refreshSessionFunction } from '../../../user/functions/refreshSessionFunction'
import {
  setErrorAction,
  setLoadingAction,
  updatePersonAction,
} from '../../reducer/actionsProjectsReducer'

export async function commentInPersonFunction(
  newComment: ICreateCommentDTO,
  personId: string,
  dispatch: Dispatch<any>,
): Promise<void> {
  dispatch(setLoadingAction(true))

  const response = await commentInPersonRequest(newComment, personId)

  if (response.errorMessage === 'Invalid token') {
    const isRefreshed = await refreshSessionFunction()

    if (isRefreshed) {
      return commentInPersonFunction(newComment, personId, dispatch)
    } else {
      dispatch(setLoadingAction(false))

      return
    }
  }

  if (response.errorMessage) {
    dispatch(setLoadingAction(false))

    dispatch(
      setErrorAction({
        title: response.errorTitle,
        message: response.errorMessage,
      }),
    )

    return
  }

  const person = response as IPersonsResponse
  dispatch(setLoadingAction(false))
  dispatch(updatePersonAction(person))
}
