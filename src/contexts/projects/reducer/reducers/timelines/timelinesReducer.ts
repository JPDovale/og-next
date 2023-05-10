// import { errorNotFound } from '@utils/errors/notFound'
// import produce from 'immer'
// import { ProjectsActionsType } from '../../actions/ActionsTypes'
import { IActionReducer } from '../../actions/types/IActionReducer'
import { IProjectState } from '../../projectsReducer'

export function timelinesReducer(state: IProjectState, action: IActionReducer) {
  switch (action.type) {
    default:
      return state
  }
}
