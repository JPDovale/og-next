import { ProjectsActionsType } from '../../actions/ActionsTypes'
import { IActionReducer } from '../../actions/types/IActionReducer'
import { IProjectState } from '../../projectsReducer'
import { addProjectFunctionReducer } from './functions/addProjectFunctionReducer'
import { deleteProjectFunctionReducer } from './functions/deleteProjectFunctionReducer'
import { setAllFunctionReducer } from './functions/setAllFunctionReducer'
import { setErrorFunctionReducer } from './functions/setErrorFunctionReducer'
import { setLoadingFunctionReducer } from './functions/setLoadingFunctionReducer'
import { setProjectsFunctionReducer } from './functions/setProjectsFunctionReducer'
import { updateProjectFunctionReducer } from './functions/updateProjectFunctionReducer'

export function projectsReducer(state: IProjectState, action: IActionReducer) {
  switch (action.type) {
    case ProjectsActionsType.UpdateProject: {
      return updateProjectFunctionReducer(state, action)
    }

    case ProjectsActionsType.AddProject: {
      return addProjectFunctionReducer(state, action)
    }

    case ProjectsActionsType.DeleteProject: {
      return deleteProjectFunctionReducer(state, action)
    }

    case ProjectsActionsType.SetAll: {
      return setAllFunctionReducer(state, action)
    }

    case ProjectsActionsType.SetError: {
      return setErrorFunctionReducer(state, action)
    }

    case ProjectsActionsType.SetLoading: {
      return setLoadingFunctionReducer(state, action)
    }

    case ProjectsActionsType.SetProjects: {
      return setProjectsFunctionReducer(state, action)
    }

    default:
      return state
  }
}
