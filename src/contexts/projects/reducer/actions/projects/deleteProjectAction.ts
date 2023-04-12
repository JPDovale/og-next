import { ProjectsActionsType, ProjectsBlockActions } from '../ActionsTypes'
import { IActionReducer } from '../types/IActionReducer'

interface IDeleteProjectAction {
  projectId: string
}

export function deleteProjectAction({
  projectId,
}: IDeleteProjectAction): IActionReducer {
  return {
    block: ProjectsBlockActions.Projects,
    type: ProjectsActionsType.DeleteProject,
    payload: {
      projectId,
    },
  }
}
