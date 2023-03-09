import { Dispatch } from 'react'
import { quitProjectRequest } from '../../../../api/projectsRequests'
import { refreshSessionFunction } from '../../../user/functions/refreshSessionFunction'
import {
  removeProjectAction,
  setErrorAction,
  setLoadingAction,
} from '../../reducer/actionsProjectsReducer'

interface IQuitProjectFunction {
  projectId: string
  dispatch: Dispatch<any>
}

export async function quitProjectFunction({
  projectId,
  dispatch,
}: IQuitProjectFunction): Promise<void> {
  dispatch(setLoadingAction(true))

  const response = await quitProjectRequest({ projectId })

  if (response.errorMessage === 'Invalid token') {
    const isRefreshed = await refreshSessionFunction()

    if (isRefreshed) {
      return quitProjectFunction({ projectId, dispatch })
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

  dispatch(removeProjectAction(projectId))
  dispatch(setLoadingAction(false))
}
