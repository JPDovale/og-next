import { Dispatch } from 'react'
import { setSceneToCompleteRequest } from '../../../../api/booksRequests'
import { ISetSceneToCompleteRequest } from '../../../../api/booksRequests/types/ISetSceneToCompleteRequest'
import { IBooksResponse } from '../../../../api/responsesTypes/IBooksResponse'
import { refreshSessionFunction } from '../../../user/functions/refreshSessionFunction'
import {
  setErrorAction,
  updateBookAction,
} from '../../reducer/actionsProjectsReducer'

interface ISetSceneToCompleteFunction {
  sceneToComplete: ISetSceneToCompleteRequest
  dispatch: Dispatch<any>
}

export async function setSceneToCompleteFunction({
  sceneToComplete,
  dispatch,
}: ISetSceneToCompleteFunction): Promise<boolean> {
  if (!sceneToComplete) {
    dispatch(
      setErrorAction({
        title: 'Error ao processar as informações',
        message:
          'Verifique as informações fornecidas e tente novamente. Certifique-se de que todos os campos estão preenchidos corretamente.',
      }),
    )
    return false
  }

  const response = await setSceneToCompleteRequest(sceneToComplete)

  if (response.errorMessage === 'Invalid token') {
    const isRefreshed = await refreshSessionFunction()

    if (isRefreshed) {
      return setSceneToCompleteFunction({ sceneToComplete, dispatch })
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
