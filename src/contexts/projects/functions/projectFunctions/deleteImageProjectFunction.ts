import { Dispatch } from 'react'
import { deleteImageProjectRequest } from '../../../../api/projectsRequests'
import { IProjectResponse } from '../../../../api/responsesTypes/IProjcetResponse'
import { refreshSessionFunction } from '../../../user/functions/refreshSessionFunction'
import {
  setErrorAction,
  setLoadingAction,
  updateProjectAction,
} from '../../reducer/actionsProjectsReducer'

interface IDeleteImageProjectFunctionProps {
  projectId: string
  dispatch: Dispatch<any>
}

export async function deleteImageProjectFunction({
  projectId,
  dispatch,
}: IDeleteImageProjectFunctionProps): Promise<any> {
  dispatch(setLoadingAction(true))

  const response = await deleteImageProjectRequest({ projectId })

  if (response.errorMessage === 'Invalid token') {
    const isRefreshed = await refreshSessionFunction()

    if (isRefreshed) {
      return deleteImageProjectFunction({ projectId, dispatch })
    } else {
      dispatch(setLoadingAction(false))
      return
    }
  }

  if (response.errorMessage) {
    dispatch(setLoadingAction(false))

    dispatch(
      setErrorAction({
        title: response.errorTitle,
        message: response.errorMessage,
      }),
    )
    return
  }

  const projectUpdated = response as IProjectResponse
  dispatch(setLoadingAction(false))
  dispatch(updateProjectAction(projectUpdated))
}
