import { IActionReducer } from '@contexts/projects/reducer/actions/types/IActionReducer'
import { IProjectState } from '@contexts/projects/reducer/projectsReducer'
import produce from 'immer'

export function setErrorFunctionReducer(
  state: IProjectState,
  action: IActionReducer,
) {
  return produce(state, (draft) => {
    draft.error = action.payload.error
  })
}
