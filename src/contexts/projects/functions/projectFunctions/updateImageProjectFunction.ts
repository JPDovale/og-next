import { Dispatch } from 'react'
import { updateImageProjectRequest } from '@api/projectsRequests'
import { IProjectResponse } from '@api/responsesTypes/IProjectResponse'
import { setLoadingAction } from '@contexts/projects/reducer/actions/projects/setLoadingAction'
import { responseDealings } from '@services/responseDealings'
import { updateProjectAction } from '@contexts/projects/reducer/actions/projects/updateProjectAction'

interface IUpdateImageProjectFunction {
  projectId: string
  file: File
  dispatch: Dispatch<any>
}

export async function updateImageProjectFunction({
  dispatch,
  file,
  projectId,
}: IUpdateImageProjectFunction): Promise<boolean> {
  dispatch(setLoadingAction(true))

  const response = await updateImageProjectRequest(projectId, file)

  const handledAnswer = await responseDealings({
    response,
    dispatch,
    into: 'projects',
    callback: () =>
      updateImageProjectFunction({
        dispatch,
        file,
        projectId,
      }),
  })

  if (handledAnswer === false) return false

  const project = response as IProjectResponse

  dispatch(updateProjectAction({ project }))

  return true
}
