import { ProjectsActionsType, ProjectsBlockActions } from '../ActionsTypes'
import { IActionReducer } from '../types/IActionReducer'

interface IDeleteBookAction {
  bookId: string
}

export function deleteBookAction({
  bookId,
}: IDeleteBookAction): IActionReducer {
  return {
    block: ProjectsBlockActions.Books,
    type: ProjectsActionsType.DeleteBook,
    payload: {
      bookId,
    },
  }
}
