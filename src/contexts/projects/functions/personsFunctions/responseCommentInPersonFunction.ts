import { Dispatch } from 'react'
import { ICreateCommentDTO } from '../../../../api/dtos/ICreateNewCommentDTO'
import { responseCommentInPersonRequest } from '../../../../api/personsRequests'
import { IPersonsResponse } from '../../../../api/responsesTypes/IPersonsResponse'
import { refreshSessionFunction } from '../../../user/functions/refreshSessionFunction'
import {
  setErrorAction,
  updatePersonAction,
} from '../../reducer/actionsProjectsReducer'

export async function responseCommentInPersonFunction(
  newResponse: ICreateCommentDTO,
  personId: string,
  commentId: string,
  dispatch: Dispatch<any>,
): Promise<void> {
  if (!newResponse || !personId || !commentId) {
    return dispatch(
      setErrorAction({
        title: 'Error ao processar as informações',
        message:
          'Verifique as informações fornecidas e tente novamente. Certifique-se de que todos os campos estão preenchidos corretamente.',
      }),
    )
  }

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
      return
    }
  }

  if (response.errorMessage) {
    return dispatch(
      setErrorAction({
        title: response.errorTitle,
        message: response.errorMessage,
      }),
    )
  }

  const person = response as IPersonsResponse
  dispatch(updatePersonAction(person))
}
