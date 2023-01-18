import { Dispatch } from 'react'
import { deleteImagePersonRequest } from '../../../../api/personsRequests'
import { IPersonsResponse } from '../../../../api/responsesTypes/IPersonsResponse'
import { refreshSessionFunction } from '../../../user/functions/refreshSessionFunction'
import {
  setErrorAction,
  updatePersonAction,
} from '../../reducer/actionsProjectsReducer'

interface IDeleteImagePersonFunction {
  personId: string
  dispatch: Dispatch<any>
}

export async function deleteImagePersonFunction({
  personId,
  dispatch,
}: IDeleteImagePersonFunction): Promise<void> {
  if (!personId) {
    return dispatch(
      setErrorAction({
        title: 'Error ao processar as informações',
        message:
          'Verifique as informações fornecidas e tente novamente. Certifique-se de que todos os campos estão preenchidos corretamente.',
      }),
    )
  }

  const response = await deleteImagePersonRequest({ personId })

  if (response.errorMessage === 'Invalid token') {
    const isRefreshed = await refreshSessionFunction()

    if (isRefreshed) {
      return deleteImagePersonFunction({ personId, dispatch })
    }
  }

  if (response.errorMessage) {
    return dispatch(
      setErrorAction({
        title: response.errorTitle,
        message: response.errorMessage,
      }),
    )
  }

  const personUpdate = response as IPersonsResponse
  dispatch(updatePersonAction(personUpdate))
}
