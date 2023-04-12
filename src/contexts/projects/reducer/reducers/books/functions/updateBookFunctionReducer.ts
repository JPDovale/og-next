import { IActionReducer } from '@contexts/projects/reducer/actions/types/IActionReducer'
import { IProjectState } from '@contexts/projects/reducer/projectsReducer'
import { errorNotFound } from '@utils/errors/notFound'
import produce from 'immer'

export function updateBookFunctionReducer(
  state: IProjectState,
  action: IActionReducer,
) {
  return produce(state, (draft) => {
    const indexOfBook = state.books.findIndex(
      (book) => book.id === action.payload.book.id,
    )

    if (indexOfBook === -1) {
      draft.loading = false
      draft.error = errorNotFound
      return
    }

    draft.books[indexOfBook] = action.payload.book
    draft.error = undefined
    draft.loading = false
  })
}
