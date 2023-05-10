import { IProjectResponse } from '@api/responsesTypes/IProjectResponse'
import { updateProjectAction } from '@contexts/projects/reducer/actions/projects/updateProjectAction'
import { responseDealings } from '@services/responseDealings'
import { Dispatch } from 'react'
import { IUpdatePlotDTO } from '@api/dtos/IUpdatePlotDTO'
import { updatePlotRequest } from '@api/projectsRequests'
import { setLoadingAction } from '@contexts/projects/reducer/actions/projects/setLoadingAction'

interface IUpdatePlotFunction {
  plot: IUpdatePlotDTO
  projectId: string
  dispatch: Dispatch<any>
}

export async function updatePlotFunction({
  dispatch,
  projectId,
  plot,
}: IUpdatePlotFunction): Promise<boolean> {
  dispatch(setLoadingAction(true))

  const response = await updatePlotRequest(projectId, plot)

  const handledAnswer = await responseDealings({
    response,
    dispatch,
    into: 'projects',
    callback: () =>
      updatePlotFunction({
        dispatch,
        projectId,
        plot,
      }),
  })

  if (handledAnswer === false) return false

  const project = response as IProjectResponse

  dispatch(updateProjectAction({ project }))

  return true
}
