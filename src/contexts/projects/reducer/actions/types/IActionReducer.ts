import {
  ProjectsActionsType,
  ProjectsBlockActions,
} from '@contexts/projects/reducer/actions/ActionsTypes'

export interface IActionReducer {
  block: ProjectsBlockActions
  type: ProjectsActionsType
  payload: any
}
