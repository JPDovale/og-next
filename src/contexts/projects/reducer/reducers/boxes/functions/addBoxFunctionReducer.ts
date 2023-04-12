import { IActionReducer } from '@contexts/projects/reducer/actions/types/IActionReducer'
import { IProjectState } from '@contexts/projects/reducer/projectsReducer'
import produce from 'immer'

export function addBoxFunctionReducer(
  state: IProjectState,
  action: IActionReducer,
) {
  return produce(state, (draft) => {
    draft.boxes.push(action.payload.box)
    draft.error = undefined
    draft.loading = false
  })
}
