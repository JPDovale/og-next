import { responseDealings } from '@services/responseDealings'
import { Dispatch } from 'react'
import { getProjectsRequest } from '@api/projectsRequests'
import { setLoadingAction } from '@contexts/projects/reducer/actions/projects/setLoadingAction'
import { setAllAction } from '@contexts/projects/reducer/actions/projects/setAllAction'

interface IGetProjectsFunction {
  dispatch: Dispatch<any>
}

export async function getProjectsFunction({
  dispatch,
}: IGetProjectsFunction): Promise<boolean> {
  dispatch(setLoadingAction(true))

  const response = await getProjectsRequest()

  const handledAnswer = await responseDealings({
    response,
    dispatch,
    into: 'projects',
    callback: () => getProjectsFunction({ dispatch }),
  })

  if (handledAnswer === false) return false

  dispatch(
    setAllAction({
      projects: response.projects,
      users: response.users,
      persons: response.persons,
      books: response.books,
      boxes: response.boxes,
      timelines: response.timelines,
    }),
  )

  return true
}
