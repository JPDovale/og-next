/* eslint-disable no-unused-vars */
import { IError } from '../../../@types/errors/IError'
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

  SetPersons = 'setPersons',

  SetProjects = 'setProjects',
  SetError = 'setError',
}

export function addProjectAction(project: IProjectResponse) {
  return {
    type: ProjectsActionsType.AddProject,
    payload: {
      project,
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
) {
  return {
    type: ProjectsActionsType.SetProjects,
    payload: {
      projects,
      users,
      persons,
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
  project?: IProjectResponse,
) {
  return {
    type: ProjectsActionsType.UpdatePerson,
    payload: {
      person,
      project,
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
