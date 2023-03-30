import { Dispatch } from 'react'
import { setSceneToCompleteRequest } from '@api/booksRequests'
import { ISetSceneToCompleteRequest } from '@api/booksRequests/types/ISetSceneToCompleteRequest'
import { IBooksResponse } from '@api/responsesTypes/IBooksResponse'
import { setLoadingAction } from '@contexts/projects/reducer/actions/projects/setLoadingAction'
import { responseDealings } from '@services/responseDealings'
import { updateBookAction } from '@contexts/projects/reducer/actions/books/updateBookAction'

interface ISetSceneToCompleteFunction {
  sceneToComplete: ISetSceneToCompleteRequest
  dispatch: Dispatch<any>
}

export async function setSceneToCompleteFunction({
  sceneToComplete,
  dispatch,
}: ISetSceneToCompleteFunction): Promise<boolean> {
  dispatch(setLoadingAction(true))

  const response = await setSceneToCompleteRequest(sceneToComplete)

  const handledAnswer = await responseDealings({
    response,
    dispatch,
    into: 'projects',
    callback: () =>
      setSceneToCompleteFunction({
        dispatch,
        sceneToComplete,
      }),
  })

  if (handledAnswer === false) return false

  const book = response as IBooksResponse

  dispatch(updateBookAction({ book }))

  return true
}
