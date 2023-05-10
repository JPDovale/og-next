import { deleteProjectAction } from '@contexts/projects/reducer/actions/projects/deleteProjectAction'
import { Dispatch } from 'react'
import { quitProjectRequest } from '@api/projectsRequests'
import { setLoadingAction } from '@contexts/projects/reducer/actions/projects/setLoadingAction'
import { responseDealings } from '@services/responseDealings'

interface IQuitProjectFunction {
  projectId: string
  dispatch: Dispatch<any>
}

export async function quitProjectFunction({
  projectId,
  dispatch,
}: IQuitProjectFunction): Promise<boolean> {
  dispatch(setLoadingAction(true))

  const response = await quitProjectRequest({ projectId })

  const handledAnswer = await responseDealings({
    response,
    dispatch,
    into: 'projects',
    callback: () => quitProjectFunction({ dispatch, projectId }),
  })

  if (handledAnswer === false) return false

  dispatch(deleteProjectAction({ projectId }))

  return true
}
