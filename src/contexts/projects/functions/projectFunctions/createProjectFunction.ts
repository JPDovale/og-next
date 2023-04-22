import { Dispatch } from 'react'
import { ICreateProjectDTO } from '@api/dtos/ICreateProjectDTO'
import { createProjectRequest } from '@api/projectsRequests'
import { setLoadingAction } from '@contexts/projects/reducer/actions/projects/setLoadingAction'
import { responseDealings } from '@services/responseDealings'

interface ICreateProjectFunction {
  newProject: ICreateProjectDTO
  dispatch: Dispatch<any>
}

export async function createProjectFunction({
  dispatch,
  newProject,
}: ICreateProjectFunction): Promise<boolean> {
  dispatch(setLoadingAction(true))
  const response = await createProjectRequest(newProject)

  const handledAnswer = await responseDealings({
    response,
    dispatch,
    into: 'projects',
    callback: () => createProjectFunction({ newProject, dispatch }),
  })

  if (handledAnswer === false) return false

  return true
}
