import { updatePersonAction } from '@contexts/projects/reducer/actions/persons/updatePersonAction'
import { responseDealings } from '@services/responseDealings'
import { Dispatch } from 'react'
import { ICreateCommentDTO } from '@api/dtos/ICreateNewCommentDTO'
import { responseCommentInPersonRequest } from '@api/personsRequests'
import { IPersonsResponse } from '@api/responsesTypes/IPersonsResponse'
import { setLoadingAction } from '@contexts/projects/reducer/actions/projects/setLoadingAction'

interface IResponseCommentInPersonFunction {
  newResponse: ICreateCommentDTO
  personId: string
  commentId: string
  dispatch: Dispatch<any>
}

export async function responseCommentInPersonFunction({
  commentId,
  dispatch,
  newResponse,
  personId,
}: IResponseCommentInPersonFunction): Promise<boolean> {
  dispatch(setLoadingAction(true))

  const response = await responseCommentInPersonRequest(
    newResponse,
    personId,
    commentId,
  )

  const handledAnswer = await responseDealings({
    response,
    dispatch,
    into: 'projects',
    callback: () =>
      responseCommentInPersonFunction({
        commentId,
        dispatch,
        newResponse,
        personId,
      }),
  })

  if (handledAnswer === false) return false

  const person = response as IPersonsResponse
  dispatch(updatePersonAction({ person }))

  return true
}
