import { IProjectResponse } from '@api/responsesTypes/IProjectResponse'
import { ProjectsActionsType, ProjectsBlockActions } from '../ActionsTypes'
import { IActionReducer } from '../types/IActionReducer'

interface IAddProjectAction {
  project: IProjectResponse
}

export function addProjectAction({
  project,
}: IAddProjectAction): IActionReducer {
  return {
    block: ProjectsBlockActions.Projects,
    type: ProjectsActionsType.AddProject,
    payload: {
      project,
    },
  }
}
