import { produce } from 'immer'

import { IError } from '../../../@types/errors/IError'
import { IPersonsResponse } from '../../../api/responsesTypes/IPersonsResponse'
import { IProjectResponse } from '../../../api/responsesTypes/IProjcetResponse'
import { IUserResponse } from '../../../api/responsesTypes/IUserResponse'
import { ProjectsActionsType } from './actionsProjectsReducer'

export interface IProjectState {
  projects: IProjectResponse[]
  persons: IPersonsResponse[]
  users: IUserResponse[]
  error: IError | undefined
}

export function projectsReducer(state: IProjectState, action: any) {
  switch (action.type) {
    case ProjectsActionsType.AddProject:
      return produce(state, (draft) => {
        draft.projects.push(action.payload.project)
        draft.error = undefined
      })

    case ProjectsActionsType.UpdateProjectImage: {
      const indexOfProject = state.projects.findIndex(
        (project) => project.id === action.payload.projectId,
      )

      if (indexOfProject === -1) return state

      return produce(state, (draft) => {
        draft.projects[indexOfProject].image = action.payload.url
        draft.error = undefined
      })
    }

    case ProjectsActionsType.UpdateProject: {
      const indexOfProject = state.projects.findIndex(
        (project) => project.id === action.payload.project.id,
      )

      if (indexOfProject === -1) return state

      return produce(state, (draft) => {
        draft.projects[indexOfProject] = action.payload.project
        draft.error = undefined
      })
    }

    case ProjectsActionsType.DeleteProject: {
      const indexOfProject = state.projects.findIndex(
        (project) => project.id === action.payload.projectId,
      )

      if (indexOfProject === -1) return state

      return produce(state, (draft) => {
        draft.projects.splice(indexOfProject, 1)
        draft.error = undefined
      })
    }

    case ProjectsActionsType.SetError: {
      return produce(state, (draft) => {
        draft.error = action.payload.error
      })
    }

    case ProjectsActionsType.SetProjects: {
      return produce(state, (draft) => {
        draft.projects = action.payload.projects
        draft.users = action.payload.users
        draft.persons = action.payload.persons
        draft.error = undefined
      })
    }

    case ProjectsActionsType.AddPerson: {
      return produce(state, (draft) => {
        draft.persons.push(action.payload.newPerson)
      })
    }

    case ProjectsActionsType.UpdatePersonImage: {
      const indexOfPerson = state.persons.findIndex(
        (person) => person.id === action.payload.personId,
      )

      if (indexOfPerson === -1) return state

      return produce(state, (draft) => {
        draft.persons[indexOfPerson].image = action.payload.url
      })
    }

    case ProjectsActionsType.UpdatePerson: {
      const indexOfPerson = state.persons.findIndex(
        (person) => person.id === action.payload.person.id,
      )
      const indexOfProject = state.projects.findIndex(
        (project) => project.id === action.payload?.project?.id,
      )

      if (indexOfPerson === -1) return state

      return produce(state, (draft) => {
        draft.persons[indexOfPerson] = action.payload.person
        if (indexOfProject !== -1) {
          draft.projects[indexOfProject] = action.payload.project
        }
      })
    }

    case ProjectsActionsType.SetPersons: {
      return produce(state, (draft) => {
        draft.persons = action.payload.persons
      })
    }

    default:
      return state
  }
}
