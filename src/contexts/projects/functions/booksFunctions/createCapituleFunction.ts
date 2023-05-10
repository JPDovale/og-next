import { updateBookAction } from '@contexts/projects/reducer/actions/books/updateBookAction'
import { responseDealings } from '@services/responseDealings'
import { Dispatch } from 'react'
import { createCapituleRequest } from '@api/booksRequests'
import { ICreateCapituleRequest } from '@api/booksRequests/types/ICreateCapituleRequest'
import { IBooksResponse } from '@api/responsesTypes/IBooksResponse'
import { setLoadingAction } from '@contexts/projects/reducer/actions/projects/setLoadingAction'

interface ICreateCapituleFunction {
  newCapitule: ICreateCapituleRequest
  dispatch: Dispatch<any>
}

export async function createCapituleFunction({
  dispatch,
  newCapitule,
}: ICreateCapituleFunction): Promise<boolean> {
  dispatch(setLoadingAction(true))

  const response = await createCapituleRequest(newCapitule)

  const handledAnswer = await responseDealings({
    response,
    dispatch,
    into: 'projects',
    callback: () => createCapituleFunction({ dispatch, newCapitule }),
  })

  if (handledAnswer === false) return false

  const book = response as IBooksResponse

  dispatch(updateBookAction({ book }))

  return true
}
