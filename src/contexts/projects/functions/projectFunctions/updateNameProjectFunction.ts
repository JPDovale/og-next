import { Dispatch } from 'react'
import { updateNameProjectRequest } from '../../../../api/projectsRequests'
import { IProjectResponse } from '../../../../api/responsesTypes/IProjcetResponse'
import { refreshSessionFunction } from '../../../user/functions/refreshSessionFunction'
import {
  setErrorAction,
  setLoadingAction,
  updateProjectAction,
} from '../../reducer/actionsProjectsReducer'

interface IUpdateNameProjectFunction {
  name: string
  projectId: string
  dispatch: Dispatch<any>
}

export async function updateNameProjectFunction({
  dispatch,
  name,
  projectId,
}: IUpdateNameProjectFunction): Promise<void> {
  dispatch(setLoadingAction(true))

  const response = await updateNameProjectRequest(name, projectId)

  if (response.errorMessage === 'Invalid token') {
    const isRefreshed = await refreshSessionFunction()

    if (isRefreshed) {
      return updateNameProjectFunction({ name, projectId, dispatch })
    } else {
      dispatch(setLoadingAction(false))

      return
    }
  }

  if (response.errorMessage) {
    dispatch(setLoadingAction(false))

    dispatch(
      setErrorAction({
        title: response.errorTitle as string,
        message: response.errorMessage,
      }),
    )
    return
  }

  const project = response as IProjectResponse
  dispatch(updateProjectAction(project))
  dispatch(setLoadingAction(false))
}
