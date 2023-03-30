import { IBooksResponse } from '@api/responsesTypes/IBooksResponse'
import { IBoxResponse } from '@api/responsesTypes/IBoxResponse'
import { ProjectsActionsType, ProjectsBlockActions } from '../ActionsTypes'
import { IActionReducer } from '../types/IActionReducer'

interface IAddBookAction {
  book: IBooksResponse
  box: IBoxResponse
}

export function addBookAction({ book, box }: IAddBookAction): IActionReducer {
  return {
    block: ProjectsBlockActions.Books,
    type: ProjectsActionsType.AddBook,
    payload: {
      book,
      box,
    },
  }
}
