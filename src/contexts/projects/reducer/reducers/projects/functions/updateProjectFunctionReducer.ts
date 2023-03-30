import { IActionReducer } from '@contexts/projects/reducer/actions/types/IActionReducer'
import { IProjectState } from '@contexts/projects/reducer/projectsReducer'
import { errorNotFound } from '@utils/errors/notFound'
import produce from 'immer'

export function updateProjectFunctionReducer(
  state: IProjectState,
  action: IActionReducer,
) {
  return produce(state, (draft) => {
    const indexOfProject = state.projects.findIndex(
      (project) => project.id === action.payload.project.id,
    )

    if (indexOfProject === -1) {
      draft.error = errorNotFound
      draft.loading = false
      return
    }

    draft.projects[indexOfProject] = action.payload.project
    draft.error = undefined
    draft.loading = false
  })
}
