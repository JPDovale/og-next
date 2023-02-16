import { Dispatch } from 'react'
import { updateSceneRequest } from '../../../../api/booksRequests'
import { IUpdateSceneRequest } from '../../../../api/booksRequests/types/IUpdateSceneRequest'
import { IBooksResponse } from '../../../../api/responsesTypes/IBooksResponse'
import { refreshSessionFunction } from '../../../user/functions/refreshSessionFunction'
import {
  setErrorAction,
  updateBookAction,
} from '../../reducer/actionsProjectsReducer'

interface IUpdateSceneFunction {
  sceneUpdate: IUpdateSceneRequest
  dispatch: Dispatch<any>
}

export async function updateSceneFunction({
  dispatch,
  sceneUpdate,
}: IUpdateSceneFunction): Promise<boolean> {
  if (!sceneUpdate) {
    dispatch(
      setErrorAction({
        title: 'Error ao processar as informações',
        message:
          'Verifique as informações fornecidas e tente novamente. Certifique-se de que todos os campos estão preenchidos corretamente.',
      }),
    )
    return false
  }

  const response = await updateSceneRequest(sceneUpdate)

  if (response.errorMessage === 'Invalid token') {
    const isRefreshed = await refreshSessionFunction()

    if (isRefreshed) {
      return updateSceneFunction({ sceneUpdate, dispatch })
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
