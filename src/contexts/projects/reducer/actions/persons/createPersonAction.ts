import { ProjectsActionsType, ProjectsBlockActions } from '../ActionsTypes'
import { IBoxResponse } from '@api/responsesTypes/IBoxResponse'
import { IPersonsResponse } from '@api/responsesTypes/IPersonsResponse'
import { ITimelineResponse } from '@api/responsesTypes/ITimelinesResponse'
import { IActionReducer } from '../types/IActionReducer'

export interface ICreatePersonAction {
  person: IPersonsResponse
  box: IBoxResponse
  timeline: ITimelineResponse
}

export function createPersonAction({
  box,
  person,
  timeline,
}: ICreatePersonAction): IActionReducer {
  return {
    block: ProjectsBlockActions.Persons,
    type: ProjectsActionsType.CreatePerson,
    payload: {
      box,
      person,
      timeline,
    },
  }
}
