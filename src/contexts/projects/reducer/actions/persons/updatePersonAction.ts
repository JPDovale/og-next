import { IPersonsResponse } from '@api/responsesTypes/IPersonsResponse'
import { ProjectsActionsType, ProjectsBlockActions } from '../ActionsTypes'
import { IActionReducer } from '../types/IActionReducer'

interface IUpdatePersonAction {
  person: IPersonsResponse
}

export function updatePersonAction({
  person,
}: IUpdatePersonAction): IActionReducer {
  return {
    block: ProjectsBlockActions.Persons,
    type: ProjectsActionsType.UpdatePerson,
    payload: {
      person,
    },
  }
}
