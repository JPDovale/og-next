import { IActionReducer } from '@contexts/projects/reducer/actions/types/IActionReducer'
import { IProjectState } from '@contexts/projects/reducer/projectsReducer'
import { errorNotFound } from '@utils/errors/notFound'
import produce from 'immer'

export function deleteProjectFunctionReducer(
  state: IProjectState,
  action: IActionReducer,
) {
  return produce(state, (draft) => {
    const indexOfProject = state.projects.findIndex(
      (project) => project.id === action.payload.projectId,
    )

    if (indexOfProject === -1) {
      draft.loading = false
      draft.error = errorNotFound

      return
    }

    draft.projects.splice(indexOfProject, 1)
    draft.error = undefined
    draft.loading = false
  })
}
