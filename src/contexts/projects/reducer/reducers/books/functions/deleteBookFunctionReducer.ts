import { IActionReducer } from '@contexts/projects/reducer/actions/types/IActionReducer'
import { IProjectState } from '@contexts/projects/reducer/projectsReducer'
import produce from 'immer'

export function deleteBookFunctionReducer(
  state: IProjectState,
  action: IActionReducer,
) {
  return produce(state, (draft) => {
    const filteredBooks = state.books.filter(
      (book) => book.id !== action.payload.bookId,
    )

    draft.books = filteredBooks
  })
}
