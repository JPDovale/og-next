import { ProjectsActionsType, ProjectsBlockActions } from '../ActionsTypes'
import { IActionReducer } from '../types/IActionReducer'

export function setLoadingAction(newState: boolean): IActionReducer {
  return {
    block: ProjectsBlockActions.Projects,
    type: ProjectsActionsType.SetLoading,
    payload: {
      loading: newState,
    },
  }
}
