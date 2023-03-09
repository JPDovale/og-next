import { Dispatch } from 'react'
import { getProjectsRequest } from '../../../../api/projectsRequests'
import { refreshSessionFunction } from '../../../user/functions/refreshSessionFunction'
import {
  setLoadingAction,
  setProjectsAction,
} from '../../reducer/actionsProjectsReducer'

export async function getProjectsFunction(
  dispatch: Dispatch<any>,
): Promise<void> {
  dispatch(setLoadingAction(true))
  const response = await getProjectsRequest()

  if (response.errorMessage === 'Invalid token') {
    const isRefreshed = await refreshSessionFunction()

    if (isRefreshed) {
      return getProjectsFunction(dispatch)
    } else {
      dispatch(setLoadingAction(false))

      return
    }
  }

  dispatch(
    setProjectsAction(
      response.projects,
      response.users,
      response.persons,
      response.books,
      response.boxes,
    ),
  )
  dispatch(setLoadingAction(false))
}
