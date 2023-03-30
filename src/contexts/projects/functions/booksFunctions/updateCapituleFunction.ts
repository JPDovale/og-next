import { responseDealings } from '@services/responseDealings'
import { Dispatch } from 'react'
import { updateCapituleRequest } from '@api/booksRequests'
import { IUpdateCapituleRequest } from '@api/booksRequests/types/IUpdateCapituleRequest'
import { IBooksResponse } from '@api/responsesTypes/IBooksResponse'
import { setLoadingAction } from '@contexts/projects/reducer/actions/projects/setLoadingAction'
import { updateBookAction } from '@contexts/projects/reducer/actions/books/updateBookAction'

interface IUpdateCapituleFunction {
  updatedCapitule: IUpdateCapituleRequest
  dispatch: Dispatch<any>
}

export async function updateCapituleFunction({
  dispatch,
  updatedCapitule,
}: IUpdateCapituleFunction): Promise<boolean> {
  dispatch(setLoadingAction(true))

  const response = await updateCapituleRequest(updatedCapitule)

  const handledAnswer = await responseDealings({
    response,
    dispatch,
    into: 'projects',
    callback: () =>
      updateCapituleFunction({
        dispatch,
        updatedCapitule,
      }),
  })

  if (handledAnswer === false) return false

  const book = response as IBooksResponse

  dispatch(updateBookAction({ book }))

  return true
}
