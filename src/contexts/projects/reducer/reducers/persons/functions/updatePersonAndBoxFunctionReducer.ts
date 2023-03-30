import { IActionReducer } from '@contexts/projects/reducer/actions/types/IActionReducer'
import { IProjectState } from '@contexts/projects/reducer/projectsReducer'
import { errorNotFound } from '@utils/errors/notFound'
import produce from 'immer'

export function updatePersonAndBoxFunctionReducer(
  state: IProjectState,
  action: IActionReducer,
) {
  return produce(state, (draft) => {
    const indexOfPerson = state.persons.findIndex(
      (person) => person.id === action.payload.person.id,
    )
    const indexOfBox = state.boxes.findIndex(
      (box) => box.id === action.payload.box.id,
    )

    if (indexOfPerson === -1 || indexOfBox === -1) {
      draft.loading = false
      draft.error = errorNotFound
      return
    }

    draft.persons[indexOfPerson] = action.payload.person
    draft.boxes[indexOfBox] = action.payload.box
    draft.error = undefined
    draft.loading = false
  })
}
