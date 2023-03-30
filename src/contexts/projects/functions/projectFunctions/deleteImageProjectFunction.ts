import { Dispatch } from 'react'
import { deleteImageProjectRequest } from '@api/projectsRequests'
import { IProjectResponse } from '@api/responsesTypes/IProjectResponse'
import { setLoadingAction } from '@contexts/projects/reducer/actions/projects/setLoadingAction'
import { responseDealings } from '@services/responseDealings'
import { updateProjectAction } from '@contexts/projects/reducer/actions/projects/updateProjectAction'

interface IDeleteImageProjectFunctionProps {
  projectId: string
  dispatch: Dispatch<any>
}

export async function deleteImageProjectFunction({
  projectId,
  dispatch,
}: IDeleteImageProjectFunctionProps): Promise<boolean> {
  dispatch(setLoadingAction(true))

  const response = await deleteImageProjectRequest({ projectId })

  const handledAnswer = await responseDealings({
    response,
    dispatch,
    into: 'projects',
    callback: () => deleteImageProjectFunction({ projectId, dispatch }),
  })

  if (handledAnswer === false) return false

  const project = response as IProjectResponse

  dispatch(updateProjectAction({ project }))

  return true
}
