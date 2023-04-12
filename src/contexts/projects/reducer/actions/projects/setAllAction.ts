import { IBooksResponse } from '@api/responsesTypes/IBooksResponse'
import { IBoxResponse } from '@api/responsesTypes/IBoxResponse'
import { IPersonsResponse } from '@api/responsesTypes/IPersonsResponse'
import { IProjectResponse } from '@api/responsesTypes/IProjectResponse'
import { ITimelineResponse } from '@api/responsesTypes/ITimelinesResponse'
import { IUserResponse } from '@api/responsesTypes/IUserResponse'
import { ProjectsActionsType, ProjectsBlockActions } from '../ActionsTypes'
import { IActionReducer } from '../types/IActionReducer'

interface ISetAllAction {
  projects: IProjectResponse[]
  users: IUserResponse[]
  persons: IPersonsResponse[]
  books: IBooksResponse[]
  boxes: IBoxResponse[]
  timelines: ITimelineResponse[]
}

export function setAllAction({
  projects,
  users,
  persons,
  books,
  boxes,
  timelines,
}: ISetAllAction): IActionReducer {
  return {
    block: ProjectsBlockActions.Projects,
    type: ProjectsActionsType.SetAll,
    payload: {
      projects,
      users,
      persons,
      books,
      boxes,
      timelines,
    },
  }
}
