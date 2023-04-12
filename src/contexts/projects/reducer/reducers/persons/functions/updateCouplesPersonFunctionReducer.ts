import { IActionReducer } from '@contexts/projects/reducer/actions/types/IActionReducer'
import { IProjectState } from '@contexts/projects/reducer/projectsReducer'
import { errorNotFound } from '@utils/errors/notFound'
import produce from 'immer'

export function updateCouplesPersonFunctionReducer(
  state: IProjectState,
  action: IActionReducer,
) {
  return produce(state, (draft) => {
    const indexOfPerson = state.persons.findIndex(
      (person) => person.id === action.payload.person.id,
    )
    const indexOfPersonOfCouple = state.persons.findIndex(
      (person) => person.id === action.payload.personOfCouple.id,
    )

    if (indexOfPerson === -1 || indexOfPersonOfCouple === -1) {
      draft.loading = false
      draft.error = errorNotFound
      return
    }

    draft.persons[indexOfPerson] = action.payload.person
    draft.persons[indexOfPersonOfCouple] = action.payload.personOfCouple
    draft.error = undefined
    draft.loading = false
  })
}
