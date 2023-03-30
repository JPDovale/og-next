import { ProjectsActionsType } from '../../actions/ActionsTypes'
import { IActionReducer } from '../../actions/types/IActionReducer'
import { IProjectState } from '../../projectsReducer'
import { addBoxFunctionReducer } from './functions/addBoxFunctionReducer'
import { deleteBoxFunctionReducer } from './functions/deleteBoxFunctionReducer'
import { updateBoxFunctionReducer } from './functions/updateBoxFunctionReducer'

export function boxesReducer(state: IProjectState, action: IActionReducer) {
  switch (action.type) {
    case ProjectsActionsType.UpdateBox: {
      return updateBoxFunctionReducer(state, action)
    }

    case ProjectsActionsType.AddBox: {
      return addBoxFunctionReducer(state, action)
    }

    case ProjectsActionsType.DeleteBox: {
      return deleteBoxFunctionReducer(state, action)
    }

    default:
      return state
  }
}
