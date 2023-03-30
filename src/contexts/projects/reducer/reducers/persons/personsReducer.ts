import { ProjectsActionsType } from '../../actions/ActionsTypes'
import { IActionReducer } from '../../actions/types/IActionReducer'
import { IProjectState } from '../../projectsReducer'
import { createPersonFunctionReducer } from './functions/createPersonFunctionReducer'
import { updateCouplesPersonFunctionReducer } from './functions/updateCouplesPersonFunctionReducer'
import { updatePersonAndBoxFunctionReducer } from './functions/updatePersonAndBoxFunctionReducer'
import { updatePersonFunctionReducer } from './functions/updatePersonFunctionReducer'

export function personsReducer(state: IProjectState, action: IActionReducer) {
  switch (action.type) {
    case ProjectsActionsType.UpdatePerson: {
      return updatePersonFunctionReducer(state, action)
    }

    case ProjectsActionsType.UpdateCouplesPerson: {
      return updateCouplesPersonFunctionReducer(state, action)
    }

    case ProjectsActionsType.UpdatePersonAndBox: {
      return updatePersonAndBoxFunctionReducer(state, action)
    }

    case ProjectsActionsType.CreatePerson: {
      return createPersonFunctionReducer(state, action)
    }

    default:
      return state
  }
}
