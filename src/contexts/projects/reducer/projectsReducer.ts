import { IBoxResponse } from '@api/responsesTypes/IBoxResponse'
import { produce } from 'immer'

import { IError } from '../../../@types/errors/IError'
import { IBooksResponse } from '../../../api/responsesTypes/IBooksResponse'
import { IPersonsResponse } from '../../../api/responsesTypes/IPersonsResponse'
import { IProjectResponse } from '../../../api/responsesTypes/IProjcetResponse'
import { IUserResponse } from '../../../api/responsesTypes/IUserResponse'
import { ProjectsActionsType } from './actionsProjectsReducer'

export interface IProjectState {
  projects: IProjectResponse[]
  persons: IPersonsResponse[]
  users: IUserResponse[]
  books: IBooksResponse[]
  boxes: IBoxResponse[]
  error: IError | undefined
  loading: boolean
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
        draft.books = action.payload.books
        draft.boxes = action.payload.boxes
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
      const indexOfBox = state.boxes.findIndex(
        (box) => box.id === action.payload?.box?.id || '',
      )

      if (indexOfPerson === -1) return state

      return produce(state, (draft) => {
        draft.persons[indexOfPerson] = action.payload.person

        if (indexOfBox !== -1) {
          draft.boxes[indexOfBox] = action.payload.box
        } else {
          draft.boxes.push(action.payload.box)
        }
      })
    }

    case ProjectsActionsType.SetPersons: {
      return produce(state, (draft) => {
        draft.persons = action.payload.persons
      })
    }

    case ProjectsActionsType.RemoveProject: {
      return produce(state, (draft) => {
        draft.projects = state.projects.filter(
          (project) => project.id !== action.payload.projectId,
        )
        draft.error = undefined
      })
    }

    case ProjectsActionsType.AddBook: {
      return produce(state, (draft) => {
        const indexOfBox = state.boxes.findIndex(
          (box) => box.id === action.payload.box.id,
        )

        if (indexOfBox < 0) {
          draft.boxes.push(action.payload.box)
        } else {
          draft.books[indexOfBox] = action.payload.box
        }

        draft.books.push(action.payload.book)
        draft.error = undefined
      })
    }

    case ProjectsActionsType.UpdateBook: {
      return produce(state, (draft) => {
        const indexOfBook = state.books.findIndex(
          (book) => book.id === action.payload.book.id,
        )

        draft.books[indexOfBook] = action.payload.book
        draft.error = undefined
      })
    }

    case ProjectsActionsType.DeleteBook: {
      return produce(state, (draft) => {
        const filteredBooks = state.books.filter(
          (book) => book.id !== action.payload.bookId,
        )

        draft.books = filteredBooks
      })
    }

    case ProjectsActionsType.SetLoading: {
      return produce(state, (draft) => {
        draft.loading = action.payload.loading
      })
    }

    case ProjectsActionsType.UpdateBox: {
      return produce(state, (draft) => {
        const indexOfBox = state.boxes.findIndex(
          (box) => box.id === action.payload.box.id,
        )

        if (indexOfBox < 0) {
          draft.boxes.push(action.payload.box)
        } else {
          draft.boxes[indexOfBox] = action.payload.box
        }
      })
    }

    default:
      return state
  }
}
