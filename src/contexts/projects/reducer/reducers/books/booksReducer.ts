import { ProjectsActionsType } from '../../actions/ActionsTypes'
import { IActionReducer } from '../../actions/types/IActionReducer'
import { IProjectState } from '../../projectsReducer'
import { addBookFunctionReducer } from './functions/addBookFunctionReducer'
import { deleteBookFunctionReducer } from './functions/deleteBookFunctionReducer'
import { updateBookFunctionReducer } from './functions/updateBookFunctionReducer'

export function booksReducer(state: IProjectState, action: IActionReducer) {
  switch (action.type) {
    case ProjectsActionsType.UpdateBook: {
      return updateBookFunctionReducer(state, action)
    }

    case ProjectsActionsType.AddBook: {
      return addBookFunctionReducer(state, action)
    }

    case ProjectsActionsType.DeleteBook: {
      return deleteBookFunctionReducer(state, action)
    }

    default:
      return state
  }
}
