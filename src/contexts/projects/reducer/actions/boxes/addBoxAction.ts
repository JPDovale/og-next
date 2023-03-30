import { IBoxResponse } from '@api/responsesTypes/IBoxResponse'
import { ProjectsActionsType, ProjectsBlockActions } from '../ActionsTypes'
import { IActionReducer } from '../types/IActionReducer'

interface IAddBoxAction {
  box: IBoxResponse
}

export function addBoxAction({ box }: IAddBoxAction): IActionReducer {
  return {
    block: ProjectsBlockActions.Boxes,
    type: ProjectsActionsType.AddBox,
    payload: {
      box,
    },
  }
}
