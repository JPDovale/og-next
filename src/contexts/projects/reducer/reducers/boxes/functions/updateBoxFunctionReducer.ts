import { IActionReducer } from '@contexts/projects/reducer/actions/types/IActionReducer'
import { IProjectState } from '@contexts/projects/reducer/projectsReducer'
import { errorNotFound } from '@utils/errors/notFound'
import produce from 'immer'

export function updateBoxFunctionReducer(
  state: IProjectState,
  action: IActionReducer,
) {
  return produce(state, (draft) => {
    const indexOfBox = state.boxes.findIndex(
      (box) => box.id === action.payload.box.id,
    )

    if (indexOfBox === -1) {
      draft.error = errorNotFound
      draft.loading = false
      return
    }

    draft.boxes[indexOfBox] = action.payload.box
    draft.error = undefined
    draft.loading = false
  })
}
