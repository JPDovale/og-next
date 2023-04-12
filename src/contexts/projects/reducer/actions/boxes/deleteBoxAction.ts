import { ProjectsActionsType, ProjectsBlockActions } from '../ActionsTypes'
import { IActionReducer } from '../types/IActionReducer'

interface IDeleteBoxAction {
  boxId: string
}

export function deleteBoxAction({ boxId }: IDeleteBoxAction): IActionReducer {
  return {
    block: ProjectsBlockActions.Boxes,
    type: ProjectsActionsType.DeleteBox,
    payload: {
      boxId,
    },
  }
}
