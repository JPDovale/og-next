import { ProjectsActionsType, ProjectsBlockActions } from './../ActionsTypes'
import { IActionReducer } from '../types/IActionReducer'
import { IBooksResponse } from '@api/responsesTypes/IBooksResponse'

interface IUpdateBookAction {
  book: IBooksResponse
}

export function updateBookAction({ book }: IUpdateBookAction): IActionReducer {
  return {
    block: ProjectsBlockActions.Books,
    type: ProjectsActionsType.UpdateBook,
    payload: {
      book,
    },
  }
}
