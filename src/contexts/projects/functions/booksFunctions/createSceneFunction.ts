import { updateBookAction } from '@contexts/projects/reducer/actions/books/updateBookAction'
import { responseDealings } from '@services/responseDealings'
import { Dispatch } from 'react'
import { createSceneRequest } from '../../../../api/booksRequests'
import { ICreateSceneRequest } from '../../../../api/booksRequests/types/ICreateSceneRequest'
import { IBooksResponse } from '../../../../api/responsesTypes/IBooksResponse'
import { setLoadingAction } from '@contexts/projects/reducer/actions/projects/setLoadingAction'

interface ICreateSceneFunction {
  newScene: ICreateSceneRequest
  dispatch: Dispatch<any>
}

export async function createSceneFunction({
  dispatch,
  newScene,
}: ICreateSceneFunction): Promise<boolean> {
  dispatch(setLoadingAction(true))

  const response = await createSceneRequest(newScene)

  const handledAnswer = await responseDealings({
    response,
    dispatch,
    into: 'projects',
    callback: () => createSceneFunction({ dispatch, newScene }),
  })

  if (handledAnswer === false) return false

  const book = response as IBooksResponse

  dispatch(updateBookAction({ book }))

  return true
}
