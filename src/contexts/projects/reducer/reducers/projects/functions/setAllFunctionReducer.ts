import { IActionReducer } from '@contexts/projects/reducer/actions/types/IActionReducer'
import { IProjectState } from '@contexts/projects/reducer/projectsReducer'
import produce from 'immer'

export function setAllFunctionReducer(
  state: IProjectState,
  action: IActionReducer,
) {
  return produce(state, (draft) => {
    draft.projects = action.payload.projects
    draft.users = action.payload.users
    draft.persons = action.payload.persons
    draft.books = action.payload.books
    draft.boxes = action.payload.boxes
    draft.timelines = action.payload.timelines
    draft.error = undefined
    draft.loading = false
  })
}
