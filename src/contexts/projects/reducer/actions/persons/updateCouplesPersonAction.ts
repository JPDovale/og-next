import { IPersonsResponse } from '@api/responsesTypes/IPersonsResponse'
import { ProjectsActionsType, ProjectsBlockActions } from '../ActionsTypes'
import { IActionReducer } from '../types/IActionReducer'

interface IUpdateCouplesPersonAction {
  person: IPersonsResponse
  personOfCouple: IPersonsResponse
}

export function updateCouplesPersonAction({
  person,
  personOfCouple,
}: IUpdateCouplesPersonAction): IActionReducer {
  return {
    block: ProjectsBlockActions.Persons,
    type: ProjectsActionsType.UpdateCouplesPerson,
    payload: {
      person,
      personOfCouple,
    },
  }
}
