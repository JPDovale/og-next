import { Dispatch } from 'react'
import { deleteImagePersonRequest } from '../../../../api/personsRequests'
import { IPersonsResponse } from '../../../../api/responsesTypes/IPersonsResponse'
import { refreshSessionFunction } from '../../../user/functions/refreshSessionFunction'
import {
  setErrorAction,
  setLoadingAction,
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
  dispatch(setLoadingAction(true))

  const response = await deleteImagePersonRequest({ personId })

  if (response.errorMessage === 'Invalid token') {
    const isRefreshed = await refreshSessionFunction()

    if (isRefreshed) {
      return deleteImagePersonFunction({ personId, dispatch })
    } else {
      dispatch(setLoadingAction(false))

      return
    }
  }

  if (response.errorMessage) {
    dispatch(setLoadingAction(false))

    dispatch(
      setErrorAction({
        title: response.errorTitle,
        message: response.errorMessage,
      }),
    )
    return
  }

  const personUpdate = response as IPersonsResponse
  dispatch(updatePersonAction(personUpdate))
  dispatch(setLoadingAction(false))
}
