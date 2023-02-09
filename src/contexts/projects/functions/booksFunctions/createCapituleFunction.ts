import { Dispatch } from 'react'
import { createCapituleRequest } from '../../../../api/booksRequests'
import { ICreateCapituleRequest } from '../../../../api/booksRequests/types/ICreateCapituleRequest'
import { IBooksResponse } from '../../../../api/responsesTypes/IBooksResponse'
import { refreshSessionFunction } from '../../../user/functions/refreshSessionFunction'
import {
  setErrorAction,
  updateBookAction,
} from '../../reducer/actionsProjectsReducer'

interface ICreateCapituleFunction {
  newCapitule: ICreateCapituleRequest
  dispatch: Dispatch<any>
}

export async function createCapituleFunction({
  dispatch,
  newCapitule,
}: ICreateCapituleFunction): Promise<boolean> {
  if (!newCapitule) {
    dispatch(
      setErrorAction({
        title: 'Error ao processar as informações',
        message:
          'Verifique as informações fornecidas e tente novamente. Certifique-se de que todos os campos estão preenchidos corretamente.',
      }),
    )
    return false
  }

  const response = await createCapituleRequest(newCapitule)

  if (response.errorMessage === 'Invalid token') {
    const isRefreshed = await refreshSessionFunction()

    if (isRefreshed) {
      return createCapituleFunction({ newCapitule, dispatch })
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
