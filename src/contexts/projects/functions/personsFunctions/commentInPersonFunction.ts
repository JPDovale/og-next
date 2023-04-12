import { Dispatch } from 'react'
import { ICreateCommentDTO } from '@api/dtos/ICreateNewCommentDTO'
import { commentInPersonRequest } from '@api/personsRequests'
import { IPersonsResponse } from '@api/responsesTypes/IPersonsResponse'
import { setLoadingAction } from '@contexts/projects/reducer/actions/projects/setLoadingAction'
import { responseDealings } from '@services/responseDealings'
import { updatePersonAction } from '@contexts/projects/reducer/actions/persons/updatePersonAction'

interface ICommentInPersonFunction {
  newComment: ICreateCommentDTO
  personId: string
  dispatch: Dispatch<any>
}

export async function commentInPersonFunction({
  dispatch,
  newComment,
  personId,
}: ICommentInPersonFunction): Promise<boolean> {
  dispatch(setLoadingAction(true))

  const response = await commentInPersonRequest(newComment, personId)

  const handledAnswer = await responseDealings({
    response,
    dispatch,
    into: 'projects',
    callback: () => commentInPersonFunction({ newComment, personId, dispatch }),
  })

  if (handledAnswer === false) return false

  const person = response as IPersonsResponse

  dispatch(updatePersonAction({ person }))

  return true
}
