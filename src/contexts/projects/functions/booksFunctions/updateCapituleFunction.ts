import { Dispatch } from 'react'
import { updateCapituleRequest } from '../../../../api/booksRequests'
import { IUpdateCapituleRequest } from '../../../../api/booksRequests/types/IUpdateCapituleRequest'
import { IBooksResponse } from '../../../../api/responsesTypes/IBooksResponse'
import { refreshSessionFunction } from '../../../user/functions/refreshSessionFunction'
import {
  setErrorAction,
  updateBookAction,
} from '../../reducer/actionsProjectsReducer'

interface IUpdateCapituleFunction {
  updatedCapitule: IUpdateCapituleRequest
  dispatch: Dispatch<any>
}

export async function updateCapituleFunction({
  dispatch,
  updatedCapitule,
}: IUpdateCapituleFunction): Promise<void> {
  if (!updatedCapitule) {
    dispatch(
      setErrorAction({
        title: 'Error ao processar as informações',
        message:
          'Verifique as informações fornecidas e tente novamente. Certifique-se de que todos os campos estão preenchidos corretamente.',
      }),
    )
    return
  }

  const response = await updateCapituleRequest(updatedCapitule)

  if (response.errorMessage === 'Invalid token') {
    const isRefreshed = await refreshSessionFunction()

    if (isRefreshed) {
      return updateCapituleFunction({ updatedCapitule, dispatch })
    } else {
      return
    }
  }

  if (response.errorMessage) {
    dispatch(
      setErrorAction({
        title: response.errorTitle as string,
        message: response.errorMessage,
      }),
    )
    return
  }

  const book = response as IBooksResponse
  dispatch(updateBookAction(book))
}
