import { Dispatch } from 'react'
import { unshareProjectRequest } from '@api/projectsRequests'
import { IProjectResponse } from '@api/responsesTypes/IProjectResponse'
import { setLoadingAction } from '@contexts/projects/reducer/actions/projects/setLoadingAction'
import { responseDealings } from '@services/responseDealings'
import { updateProjectAction } from '@contexts/projects/reducer/actions/projects/updateProjectAction'

interface IUnshareProjectFunction {
  userEmail: string
  projectId: string
  dispatch: Dispatch<any>
}

export async function unshareProjectFunction({
  dispatch,
  userEmail,
  projectId,
}: IUnshareProjectFunction): Promise<boolean> {
  dispatch(setLoadingAction(true))

  const response = await unshareProjectRequest(userEmail, projectId)

  const handledAnswer = await responseDealings({
    response,
    dispatch,
    into: 'projects',
    callback: () =>
      unshareProjectFunction({
        dispatch,
        projectId,
        userEmail,
      }),
  })

  if (handledAnswer === false) return false

  const project = response as IProjectResponse
  dispatch(updateProjectAction({ project }))

  return true
}
