import { Dispatch } from 'react'
import { IUpdatePlotDTO } from '../../../../api/dtos/IUpdatePlotDTO'
import { updatePlotRequest } from '../../../../api/projectsRequests'
import { refreshSessionFunction } from '../../../user/functions/refreshSessionFunction'
import {
  setErrorAction,
  setLoadingAction,
  updateProjectAction,
} from '../../reducer/actionsProjectsReducer'

export async function updatePlotFunction(
  plot: IUpdatePlotDTO,
  projectId: string,
  dispatch: Dispatch<any>,
): Promise<void> {
  dispatch(setLoadingAction(true))

  const response = await updatePlotRequest(projectId, plot)

  if (response.errorMessage === 'Invalid token') {
    const isRefreshed = await refreshSessionFunction()

    if (isRefreshed) {
      return updatePlotFunction(plot, projectId, dispatch)
    } else {
      dispatch(setLoadingAction(false))

      return
    }
  }

  if (response.errorMessage) {
    dispatch(setLoadingAction(false))

    dispatch(
      setErrorAction({
        title: response.errorTitle as string,
        message: response.errorMessage,
      }),
    )
    return
  }

  dispatch(setLoadingAction(false))
  dispatch(updateProjectAction(response))
}
