import { Dispatch } from 'react'
import { updateNameProjectRequest } from '@api/projectsRequests'
import { IProjectResponse } from '@api/responsesTypes/IProjectResponse'
import { setLoadingAction } from '@contexts/projects/reducer/actions/projects/setLoadingAction'
import { responseDealings } from '@services/responseDealings'
import { updateProjectAction } from '@contexts/projects/reducer/actions/projects/updateProjectAction'

interface IUpdateNameProjectFunction {
  name: string
  projectId: string
  dispatch: Dispatch<any>
}

export async function updateNameProjectFunction({
  dispatch,
  name,
  projectId,
}: IUpdateNameProjectFunction): Promise<boolean> {
  dispatch(setLoadingAction(true))

  const response = await updateNameProjectRequest(name, projectId)

  const handledAnswer = await responseDealings({
    response,
    dispatch,
    into: 'projects',
    callback: () =>
      updateNameProjectFunction({
        dispatch,
        name,
        projectId,
      }),
  })

  if (handledAnswer === false) return false

  const project = response as IProjectResponse

  dispatch(updateProjectAction({ project }))

  return true
}
