import { IActionReducer } from '@contexts/projects/reducer/actions/types/IActionReducer'
import { IProjectState } from '@contexts/projects/reducer/projectsReducer'
import produce from 'immer'

export function deleteBoxFunctionReducer(
  state: IProjectState,
  action: IActionReducer,
) {
  return produce(state, (draft) => {
    draft.boxes = state.boxes.filter((box) => box.id !== action.payload.boxId)
    draft.error = undefined
    draft.loading = false
  })
}
