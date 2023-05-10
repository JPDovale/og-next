import { IBoxResponse } from '@api/responsesTypes/IBoxResponse'
import { IPersonsResponse } from '@api/responsesTypes/IPersonsResponse'
import { ProjectsActionsType, ProjectsBlockActions } from '../ActionsTypes'
import { IActionReducer } from '../types/IActionReducer'

interface IUpdatePersonAndBoxAction {
  person: IPersonsResponse
  box: IBoxResponse
}

export function updatePersonAndBoxAction({
  person,
  box,
}: IUpdatePersonAndBoxAction): IActionReducer {
  return {
    block: ProjectsBlockActions.Persons,
    type: ProjectsActionsType.UpdatePerson,
    payload: {
      person,
      box,
    },
  }
}
