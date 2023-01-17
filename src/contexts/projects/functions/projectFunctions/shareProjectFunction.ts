import { Dispatch } from 'react'
import { IShareProjectDTO } from '../../../../api/dtos/IShareProjectDTO'
import { shareProjectRequest } from '../../../../api/projectsRequests'
import { IProjectResponse } from '../../../../api/responsesTypes/IProjcetResponse'
import { refreshSessionFunction } from '../../../user/functions/refreshSessionFunction'
import {
  setErrorAction,
  updateProjectAction,
} from '../../reducer/actionsProjectsReducer'

export async function shareProjectFunction(
  share: IShareProjectDTO,
  dispatch: Dispatch<any>,
): Promise<boolean> {
  if (!share) {
    dispatch(
      setErrorAction({
        title: 'Error ao processar as informações',
        message:
          'Verifique as informações fornecidas e tente novamente. Certifique-se de que todos os campos estão preenchidos corretamente.',
      }),
    )
    return false
  }

  const shareBodyRequest = {
    user: {
      email: share.email,
      permission: share.permission,
    },
    projectId: share.projectId,
  }

  const response = await shareProjectRequest(shareBodyRequest)

  if (response.errorMessage === 'Invalid token') {
    const isRefreshed = await refreshSessionFunction()

    if (isRefreshed) {
      return shareProjectFunction(share, dispatch)
    } else {
      return false
    }
  }

  if (response.errorMessage) {
    dispatch(
      setErrorAction({
        title: response.errorTitle,
        message: response.errorMessage,
      }),
    )
    return false
  }

  const project = response as IProjectResponse
  dispatch(updateProjectAction(project))

  return true
}
