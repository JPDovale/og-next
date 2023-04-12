import { updateBookAction } from '@contexts/projects/reducer/actions/books/updateBookAction'
import { responseDealings } from '@services/responseDealings'
import { Dispatch } from 'react'
import { deleteSceneRequest } from '@api/booksRequests'
import { IBooksResponse } from '@api/responsesTypes/IBooksResponse'
import { setLoadingAction } from '@contexts/projects/reducer/actions/projects/setLoadingAction'

interface IDeleteSceneFunction {
  bookId: string
  capituleId: string
  sceneId: string
  dispatch: Dispatch<any>
}

export async function deleteSceneFunction({
  bookId,
  capituleId,
  sceneId,
  dispatch,
}: IDeleteSceneFunction): Promise<boolean> {
  dispatch(setLoadingAction(true))

  const response = await deleteSceneRequest({ bookId, capituleId, sceneId })

  const handledAnswer = await responseDealings({
    response,
    dispatch,
    into: 'projects',
    callback: () =>
      deleteSceneFunction({ dispatch, bookId, capituleId, sceneId }),
  })

  if (handledAnswer === false) return false

  const book = response as IBooksResponse

  dispatch(updateBookAction({ book }))

  return true
}
