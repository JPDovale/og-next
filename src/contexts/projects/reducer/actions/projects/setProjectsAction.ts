import { IProjectResponse } from '@api/responsesTypes/IProjectResponse'
import { ProjectsActionsType, ProjectsBlockActions } from '../ActionsTypes'
import { IActionReducer } from '../types/IActionReducer'

interface ISetProjectsAction {
  projects: IProjectResponse[]
}

export function setProjectsAction({
  projects,
}: ISetProjectsAction): IActionReducer {
  return {
    block: ProjectsBlockActions.Projects,
    type: ProjectsActionsType.SetProjects,
    payload: {
      projects,
    },
  }
}
