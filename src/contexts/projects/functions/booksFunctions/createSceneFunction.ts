import { Dispatch } from 'react'
import { createSceneRequest } from '../../../../api/booksRequests'
import { ICreateSceneRequest } from '../../../../api/booksRequests/types/ICreateSceneRequest'
import { IBooksResponse } from '../../../../api/responsesTypes/IBooksResponse'
import { refreshSessionFunction } from '../../../user/functions/refreshSessionFunction'
import {
  setErrorAction,
  updateBookAction,
} from '../../reducer/actionsProjectsReducer'

interface ICreateSceneFunction {
  newScene: ICreateSceneRequest
  dispatch: Dispatch<any>
}

export async function createSceneFunction({
  dispatch,
  newScene,
}: ICreateSceneFunction): Promise<boolean> {
  if (!newScene) {
    dispatch(
      setErrorAction({
        title: 'Error ao processar as informações',
        message:
          'Verifique as informações fornecidas e tente novamente. Certifique-se de que todos os campos estão preenchidos corretamente.',
      }),
    )
    return false
  }

  const response = await createSceneRequest(newScene)

  if (response.errorMessage === 'Invalid token') {
    const isRefreshed = await refreshSessionFunction()

    if (isRefreshed) {
      return createSceneFunction({ newScene, dispatch })
    } else {
      return false
    }
  }

  if (response.errorMessage) {
    dispatch(
      setErrorAction({
        title: response.errorTitle as string,
        message: response.errorMessage,
      }),
    )
    return false
  }

  const book = response as IBooksResponse
  dispatch(updateBookAction(book))

  return true
}
