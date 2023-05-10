/* eslint-disable no-unused-vars */
export enum ProjectsActionsType {
  AddProject = 'addProject',
  UpdateProject = 'updateProject',
  DeleteProject = 'deleteProject',
  SetProjects = 'setProjects',

  SetAll = 'setAll',
  SetError = 'setError',
  SetLoading = 'setLoading',

  UpdatePerson = 'updatePerson',
  UpdateCouplesPerson = 'updateCouplesPerson',
  UpdatePersonAndBox = 'updatePersonAndBox',
  CreatePerson = 'createPerson',

  UpdateBook = 'updateBook',
  AddBook = 'addBook',
  DeleteBook = 'deleteBook',

  UpdateBox = 'updateBox',
  AddBox = 'addBox',
  DeleteBox = 'deleteBox',
}

export enum ProjectsBlockActions {
  Boxes = 'boxes',
  Persons = 'persons',
  Projects = 'projects',
  Timelines = 'timelines',
  Books = 'books',
}
