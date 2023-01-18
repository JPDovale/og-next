import { Dispatch } from 'react'
import { deleteImageProjectRequest } from '../../../../api/projectsRequests'
import { IProjectResponse } from '../../../../api/responsesTypes/IProjcetResponse'
import { refreshSessionFunction } from '../../../user/functions/refreshSessionFunction'
import {
  setErrorAction,
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
  if (!projectId) {
    return dispatch(
      setErrorAction({
        title: 'Error ao processar as informações',
        message:
          'Verifique as informações fornecidas e tente novamente. Certifique-se de que todos os campos estão preenchidos corretamente.',
      }),
    )
  }

  const response = await deleteImageProjectRequest({ projectId })

  if (response.errorMessage === 'Invalid token') {
    const isRefreshed = await refreshSessionFunction()

    if (isRefreshed) {
      return deleteImageProjectFunction({ projectId, dispatch })
    }
  }

  if (response.errorMessage) {
    return dispatch(
      setErrorAction({
        title: response.errorTitle,
        message: response.errorMessage,
      }),
    )
  }

  const projectUpdated = response as IProjectResponse
  dispatch(updateProjectAction(projectUpdated))
}
