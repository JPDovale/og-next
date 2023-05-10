import { IActionReducer } from '@contexts/projects/reducer/actions/types/IActionReducer'
import { IProjectState } from '@contexts/projects/reducer/projectsReducer'
import produce from 'immer'

export function addBookFunctionReducer(
  state: IProjectState,
  action: IActionReducer,
) {
  return produce(state, (draft) => {
    const indexOfBox = state.boxes.findIndex(
      (box) => box.id === action.payload.box.id,
    )

    if (indexOfBox === -1) {
      draft.boxes.push(action.payload.box)
    } else {
      draft.boxes[indexOfBox] = action.payload.box
    }

    draft.books.push(action.payload.book)
    draft.error = undefined
    draft.loading = false
  })
}
