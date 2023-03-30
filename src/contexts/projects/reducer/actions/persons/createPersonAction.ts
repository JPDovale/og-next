import { ProjectsActionsType } from '../ActionsTypes'
import { ICreatePersonAction } from './types/ICreatePersonAction'

export function createPersonAction({
  box,
  person,
  timeline,
}: ICreatePersonAction) {
  return {
    type: ProjectsActionsType.CreatePerson,
    payload: {
      box,
      person,
      timeline,
    },
  }
}
