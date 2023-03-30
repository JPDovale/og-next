import { IProjectResponse } from '@api/responsesTypes/IProjectResponse'
import { ProjectsActionsType, ProjectsBlockActions } from '../ActionsTypes'
import { IActionReducer } from '../types/IActionReducer'

interface IUpdateProjectAction {
  project: IProjectResponse
}

export function updateProjectAction({
  project,
}: IUpdateProjectAction): IActionReducer {
  return {
    block: ProjectsBlockActions.Projects,
    type: ProjectsActionsType.UpdateProject,
    payload: {
      project,
    },
  }
}
