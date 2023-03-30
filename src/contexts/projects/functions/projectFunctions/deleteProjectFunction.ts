import { Dispatch } from 'react'
import { deleteProjectRequest } from '@api/projectsRequests'
import { setLoadingAction } from '@contexts/projects/reducer/actions/projects/setLoadingAction'
import { responseDealings } from '@services/responseDealings'
import { deleteProjectAction } from '@contexts/projects/reducer/actions/projects/deleteProjectAction'

interface IDeleteProjectFunction {
  projectId: string
  dispatch: Dispatch<any>
}

export async function deleteProjectFunction({
  dispatch,
  projectId,
}: IDeleteProjectFunction): Promise<boolean> {
  dispatch(setLoadingAction(true))

  const response = await deleteProjectRequest(projectId)

  const handledAnswer = await responseDealings({
    response,
    dispatch,
    into: 'projects',
    callback: () => deleteProjectFunction({ projectId, dispatch }),
  })

  if (handledAnswer === false) return false

  dispatch(deleteProjectAction({ projectId }))

  return true
}
