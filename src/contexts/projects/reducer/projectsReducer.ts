import { IBoxResponse } from '@api/responsesTypes/IBoxResponse'
import { ITimelineResponse } from '@api/responsesTypes/ITimelinesResponse'
import { projectsReducer as projectsProjectsReducer } from './reducers/projects/projectsReducer'
import { IBooksResponse } from '@api/responsesTypes/IBooksResponse'
import { IPersonsResponse } from '@api/responsesTypes/IPersonsResponse'
import { IUserResponse } from '@api/responsesTypes/IUserResponse'
import { ProjectsBlockActions } from './actions/ActionsTypes'
import { IActionReducer } from './actions/types/IActionReducer'
import { booksReducer } from './reducers/books/booksReducer'
import { boxesReducer } from './reducers/boxes/boxesReducer'
import { personsReducer } from './reducers/persons/personsReducer'
import { timelinesReducer } from './reducers/timelines/timelinesReducer'

export interface IProjectState {
  persons: IPersonsResponse[]
  users: IUserResponse[]
  books: IBooksResponse[]
  boxes: IBoxResponse[]
  timelines: ITimelineResponse[]
}

export function projectsReducer(state: IProjectState, action: IActionReducer) {
  switch (action.block) {
    case ProjectsBlockActions.Projects: {
      return projectsProjectsReducer(state, action)
    }

    case ProjectsBlockActions.Persons: {
      return personsReducer(state, action)
    }

    case ProjectsBlockActions.Timelines: {
      return timelinesReducer(state, action)
    }

    case ProjectsBlockActions.Books: {
      return booksReducer(state, action)
    }

    case ProjectsBlockActions.Boxes: {
      return boxesReducer(state, action)
    }

    default:
      return state
  }
}
