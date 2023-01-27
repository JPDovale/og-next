import { Dispatch } from 'react'
import { quitProjectRequest } from '../../../../api/projectsRequests'
import { refreshSessionFunction } from '../../../user/functions/refreshSessionFunction'
import {
  removeProjectAction,
  setErrorAction,
} from '../../reducer/actionsProjectsReducer'

interface IQuitProjectFunction {
  projectId: string
  dispatch: Dispatch<any>
}

export async function quitProjectFunction({
  projectId,
  dispatch,
}: IQuitProjectFunction): Promise<void> {
  const response = await quitProjectRequest({ projectId })

  if (response.errorMessage === 'Invalid token') {
    const isRefreshed = await refreshSessionFunction()

    if (isRefreshed) {
      return quitProjectFunction({ projectId, dispatch })
    } else {
      return
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

  dispatch(removeProjectAction(projectId))
}
