import { Dispatch } from 'react'
import { IUpdatePlotDTO } from '../../../../api/dtos/IUpdatePlotDTO'
import { updatePlotRequest } from '../../../../api/projectsRequests'
import { refreshSessionFunction } from '../../../user/functions/refreshSessionFunction'
import {
  setErrorAction,
  updateProjectAction,
} from '../../reducer/actionsProjectsReducer'

export async function updatePlotFunction(
  plot: IUpdatePlotDTO,
  projectId: string,
  dispatch: Dispatch<any>,
): Promise<void> {
  if (!plot || !projectId) {
    return dispatch(
      setErrorAction({
        title: 'Error ao processar as informações',
        message:
          'Verifique as informações fornecidas e tente novamente. Certifique-se de que todos os campos estão preenchidos corretamente.',
      }),
    )
  }
  const response = await updatePlotRequest(projectId, plot)

  if (response.errorMessage === 'Invalid token') {
    const isRefreshed = await refreshSessionFunction()

    if (isRefreshed) {
      return updatePlotFunction(plot, projectId, dispatch)
    } else {
      return
    }
  }

  if (response.errorMessage) {
    return dispatch(
      setErrorAction({
        title: response.errorTitle as string,
        message: response.errorMessage,
      }),
    )
  }

  dispatch(updateProjectAction(response))
}
