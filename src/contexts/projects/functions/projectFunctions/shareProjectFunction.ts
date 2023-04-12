import { updateProjectAction } from '@contexts/projects/reducer/actions/projects/updateProjectAction'
import { responseDealings } from '@services/responseDealings'
import { Dispatch } from 'react'
import { IShareProjectDTO } from '@api/dtos/IShareProjectDTO'
import { shareProjectRequest } from '@api/projectsRequests'
import { IProjectResponse } from '@api/responsesTypes/IProjectResponse'
import { setLoadingAction } from '@contexts/projects/reducer/actions/projects/setLoadingAction'

interface IShareProjectFunction {
  share: IShareProjectDTO
  dispatch: Dispatch<any>
}

export async function shareProjectFunction({
  share,
  dispatch,
}: IShareProjectFunction): Promise<boolean> {
  dispatch(setLoadingAction(true))

  const shareBodyRequest = {
    user: {
      email: share.email,
      permission: share.permission,
    },
    projectId: share.projectId,
  }

  const response = await shareProjectRequest(shareBodyRequest)

  const handledAnswer = await responseDealings({
    response,
    dispatch,
    into: 'projects',
    callback: () =>
      shareProjectFunction({
        dispatch,
        share,
      }),
  })

  if (handledAnswer === false) return false

  const project = response as IProjectResponse

  dispatch(updateProjectAction({ project }))

  return true
}
