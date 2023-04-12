import { IBoxResponse } from '@api/responsesTypes/IBoxResponse'
import { ProjectsActionsType, ProjectsBlockActions } from '../ActionsTypes'
import { IActionReducer } from '../types/IActionReducer'

interface IUpdateBoxAction {
  box: IBoxResponse
}

export function updateBoxAction({ box }: IUpdateBoxAction): IActionReducer {
  return {
    block: ProjectsBlockActions.Boxes,
    type: ProjectsActionsType.UpdateBox,
    payload: {
      box,
    },
  }
}
