import { responseDealings } from '@services/responseDealings'
import { Dispatch } from 'react'
import { updateSceneRequest } from '@api/booksRequests'
import { IUpdateSceneRequest } from '@api/booksRequests/types/IUpdateSceneRequest'
import { IBooksResponse } from '@api/responsesTypes/IBooksResponse'
import { setLoadingAction } from '@contexts/projects/reducer/actions/projects/setLoadingAction'
import { updateBookAction } from '@contexts/projects/reducer/actions/books/updateBookAction'

interface IUpdateSceneFunction {
  sceneUpdate: IUpdateSceneRequest
  dispatch: Dispatch<any>
}

export async function updateSceneFunction({
  dispatch,
  sceneUpdate,
}: IUpdateSceneFunction): Promise<boolean> {
  dispatch(setLoadingAction(true))

  const response = await updateSceneRequest(sceneUpdate)

  const handledAnswer = await responseDealings({
    response,
    dispatch,
    into: 'projects',
    callback: () =>
      updateSceneFunction({
        dispatch,
        sceneUpdate,
      }),
  })

  if (handledAnswer === false) return false

  const book = response as IBooksResponse
  dispatch(updateBookAction({ book }))

  return true
}
