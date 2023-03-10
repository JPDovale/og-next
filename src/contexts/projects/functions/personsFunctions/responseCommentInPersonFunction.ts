import { Dispatch } from 'react'
import { ICreateCommentDTO } from '../../../../api/dtos/ICreateNewCommentDTO'
import { responseCommentInPersonRequest } from '../../../../api/personsRequests'
import { IPersonsResponse } from '../../../../api/responsesTypes/IPersonsResponse'
import { refreshSessionFunction } from '../../../user/functions/refreshSessionFunction'
import {
  setErrorAction,
  setLoadingAction,
  updatePersonAction,
} from '../../reducer/actionsProjectsReducer'

export async function responseCommentInPersonFunction(
  newResponse: ICreateCommentDTO,
  personId: string,
  commentId: string,
  dispatch: Dispatch<any>,
): Promise<void> {
  dispatch(setLoadingAction(true))

  const response = await responseCommentInPersonRequest(
    newResponse,
    personId,
    commentId,
  )

  if (response.errorMessage === 'Invalid token') {
    const isRefreshed = await refreshSessionFunction()

    if (isRefreshed) {
      return responseCommentInPersonFunction(
        newResponse,
        personId,
        commentId,
        dispatch,
      )
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
  dispatch(updatePersonAction(person))
  dispatch(setLoadingAction(false))
}
