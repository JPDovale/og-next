import { IActionReducer } from '@contexts/projects/reducer/actions/types/IActionReducer'
import { IProjectState } from '@contexts/projects/reducer/projectsReducer'
import produce from 'immer'

export function createPersonFunctionReducer(
  state: IProjectState,
  action: IActionReducer,
) {
  return produce(state, (draft) => {
    const indexOfBox = state.boxes.findIndex(
      (box) => box.id === action.payload.box.id,
    )

    const indexOfTimeline = state.timelines.findIndex(
      (timeline) => timeline.id === action.payload.timeline.id,
    )

    const allIndexesExites = indexOfBox !== -1 && indexOfTimeline !== -1

    if (!allIndexesExites) return state

    draft.boxes[indexOfBox] = action.payload.box
    draft.timelines[indexOfTimeline] = action.payload.timeline
    draft.persons.push(action.payload.person)
    draft.loading = false
    draft.error = undefined
  })
}
