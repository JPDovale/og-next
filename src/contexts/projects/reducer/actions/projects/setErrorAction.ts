import { IError } from '@@types/errors/IError'
import { ProjectsActionsType, ProjectsBlockActions } from '../ActionsTypes'
import { IActionReducer } from '../types/IActionReducer'

export function setErrorAction(error: IError | undefined): IActionReducer {
  return {
    block: ProjectsBlockActions.Projects,
    type: ProjectsActionsType.SetError,
    payload: {
      error,
    },
  }
}
