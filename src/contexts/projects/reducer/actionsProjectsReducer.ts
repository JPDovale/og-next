import { ITimelineResponse } from '@api/responsesTypes/ITimelinesResponse'
/* eslint-disable no-unused-vars */
import { IBoxResponse } from '@api/responsesTypes/IBoxResponse'
import { IError } from '../../../@types/errors/IError'
import { IBooksResponse } from '../../../api/responsesTypes/IBooksResponse'
import { IPersonsResponse } from '../../../api/responsesTypes/IPersonsResponse'
import { IProjectResponse } from '../../../api/responsesTypes/IProjcetResponse'
import { IUserResponse } from '../../../api/responsesTypes/IUserResponse'

export enum ProjectsActionsType {
  AddProject = 'addProject',
  UpdateProjectImage = 'updateProjectImage',
  UpdateProject = 'updateProject',
  DeleteProject = 'deleteProject',
  AddPerson = 'addPerson',
  UpdatePersonImage = 'updatePersonImage',
  UpdatePerson = 'updatePerson',
  RemoveProject = 'removeProject',
  AddBook = 'addBook',
  UpdateBook = 'updateBook',
  DeleteBook = 'deleteBook',

  SetPersons = 'setPersons',

  SetProjects = 'setProjects',
  SetError = 'setError',
  SetLoading = 'setLoading',
  UpdateBox = 'updateBox',
  AddBox = 'addBox',
  DeleteBox = 'deleteBox',
}

export function addProjectAction(project: IProjectResponse) {
  return {
    type: ProjectsActionsType.AddProject,
    payload: {
      project,
    },
  }
}

export function updateBoxAction(box: IBoxResponse) {
  return {
    type: ProjectsActionsType.UpdateBox,
    payload: {
      box,
    },
  }
}

export function addBoxAction(box: IBoxResponse) {
  return {
    type: ProjectsActionsType.AddBox,
    payload: {
      box,
    },
  }
}

export function setLoadingAction(newState: boolean) {
  return {
    type: ProjectsActionsType.SetLoading,
    payload: {
      loading: newState,
    },
  }
}

export function updateImageProjectAction(projectId: string, url: string) {
  return {
    type: ProjectsActionsType.UpdateProjectImage,
    payload: {
      projectId,
      url,
    },
  }
}

export function updateProjectAction(project: IProjectResponse) {
  return {
    type: ProjectsActionsType.UpdateProject,
    payload: {
      project,
    },
  }
}

export function deleteProjectAction(projectId: string) {
  return {
    type: ProjectsActionsType.DeleteProject,
    payload: {
      projectId,
    },
  }
}

export function setErrorAction(error: IError | undefined) {
  return {
    type: ProjectsActionsType.SetError,
    payload: {
      error,
    },
  }
}

export function setProjectsAction(
  projects: IProjectResponse[],
  users: IUserResponse[],
  persons: IPersonsResponse[],
  books: IBooksResponse[],
  boxes: IBoxResponse[],
  timelines: ITimelineResponse[],
) {
  return {
    type: ProjectsActionsType.SetProjects,
    payload: {
      projects,
      users,
      persons,
      books,
      boxes,
      timelines,
    },
  }
}

export function addPersonAction(newPerson: IPersonsResponse) {
  return {
    type: ProjectsActionsType.AddPerson,
    payload: {
      newPerson,
    },
  }
}

export function updatePersonImageAction(personId: string, url: string) {
  return {
    type: ProjectsActionsType.UpdatePersonImage,
    payload: {
      personId,
      url,
    },
  }
}

export function updatePersonAction(
  person: IPersonsResponse,
  box?: IBoxResponse,
) {
  return {
    type: ProjectsActionsType.UpdatePerson,
    payload: {
      person,
      box,
    },
  }
}

export function setPersonsAction(persons: IPersonsResponse[]) {
  return {
    type: ProjectsActionsType.SetPersons,
    payload: {
      persons,
    },
  }
}

export function removeProjectAction(projectId: string) {
  return {
    type: ProjectsActionsType.RemoveProject,
    payload: {
      projectId,
    },
  }
}

export function addBookAction(book: IBooksResponse, box: IBoxResponse) {
  return {
    type: ProjectsActionsType.AddBook,
    payload: {
      book,
      box,
    },
  }
}

export function updateBookAction(book: IBooksResponse) {
  return {
    type: ProjectsActionsType.UpdateBook,
    payload: {
      book,
    },
  }
}

export function deleteBoxAction(boxId: string) {
  return {
    type: ProjectsActionsType.DeleteBox,
    payload: {
      boxId,
    },
  }
}

export function deleteBookAction(bookId: string) {
  return {
    type: ProjectsActionsType.DeleteBook,
    payload: {
      bookId,
    },
  }
}
