import { Dispatch } from 'react'
import { getProjectsRequest } from '../../../../api/projectsRequests'
import { refreshSessionFunction } from '../../../user/functions/refreshSessionFunction'
import { setProjectsAction } from '../../reducer/actionsProjectsReducer'

export async function getProjectsFunction(
  dispatch: Dispatch<any>,
): Promise<void> {
  const response = await getProjectsRequest()

  if (response.errorMessage === 'Invalid token') {
    const isRefreshed = await refreshSessionFunction()

    if (isRefreshed) {
      return getProjectsFunction(dispatch)
    } else {
      return
    }
  }

  dispatch(
    setProjectsAction(response.projects, response.users, response.persons),
  )
}
