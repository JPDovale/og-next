import { IEditorTo } from '../../../@types/editores/IEditorTo'
import { IGenericObject } from '../../../@types/editores/IGenericObject'
import { IError } from '../../../@types/errors/IError'
import { ICreateCommentDTO } from '../../../api/dtos/ICreateNewCommentDTO'
import { ICreatePersonDTO } from '../../../api/dtos/ICreatePersonDTO'
import { ICreateProjectDTO } from '../../../api/dtos/ICreateProjectDTO'
import { IShareProjectDTO } from '../../../api/dtos/IShareProjectDTO'
import { IUpdatePlotDTO } from '../../../api/dtos/IUpdatePlotDTO'
import { IObjective } from '../../../api/responsesTypes/IPersonsResponse'
import { IDeleteImagePerson } from '../types/interfaceFunctions/IDeleteImagePerson'
import { IDeleteImageProject } from '../types/interfaceFunctions/IDeleteImageProject'
import { IDeleteObjective } from '../types/interfaceFunctions/IDeleteObjective'
import { IQuitProject } from '../types/interfaceFunctions/IQuitProject'
import { IProjectsContext } from '../types/IProjectContext'

export const projectsDefaultValues: IProjectsContext = {
  loading: true,
  projects: [],
  users: [],
  persons: [],
  books: [],

  error: undefined,
  setError: (newState: IError | undefined) => {},

  createProject: async (project: ICreateProjectDTO) => '',
  updateImageProject: async (projectId: string, file: File) => false,
  shareProject: async (newShare: IShareProjectDTO) => false,
  updatePlot: async (newPlot: IUpdatePlotDTO, projectId: string) => {},
  commentInPlot: async (newComment: ICreateCommentDTO, projectId: string) => {},
  responseCommentInPlot: async (
    newComment: ICreateCommentDTO,
    projectId: string,
    commentId: string,
  ) => {},
  deleteProject: async (projectId: string) => {},

  createNewPerson: async (person: ICreatePersonDTO) => false,
  updateImageFromPerson: async (personId: string, file: File) => false,
  updateObjective: async (
    objective: IObjective,
    personId: string,
    objectiveId: string,
  ) => false,
  createObjective: async (
    objective: IObjective,
    personId: string,
    projectId: string,
  ) => false,
  saveRefObjective: async (
    objective: IObjective,
    personId: string,
    projectId: string,
    refId: string,
  ) => false,

  commentInPerson: async (
    newComment: ICreateCommentDTO,
    personId: string,
  ) => {},

  responseCommentToPerson: async (
    newResponse: ICreateCommentDTO,
    personId: string,
    commentId: string,
  ) => {},
  createObjectGeneric: async (
    generic: IGenericObject,
    to: IEditorTo,
    personId: string,
    projectId: string,
  ) => false,
  saveRefObjectGeneric: async (
    personId: string,
    projectId: string,
    refId: string,
    to: IEditorTo,
    subObjects?: Array<{
      title: string
      description: string
    }>,
  ) => false,

  updateObjectGeneric: async (
    generic: IGenericObject,
    personId: string,
    genericId: string,
    to: IEditorTo,
  ) => false,
  deleteObjectGeneric: async (
    generic: IGenericObject,
    personId: string,
    genericId: string,
    to: IEditorTo,
  ) => {},
  unshareProject: async (userEmail: string, projectId: string) => {},
  updatePerson: async (person: ICreatePersonDTO, personId: string) => {},
  deleteImageProject: async ({ projectId }: IDeleteImageProject) => {},
  deleteImagePerson: async ({ personId }: IDeleteImagePerson) => {},
  quitProject: async ({ projectId }: IQuitProject) => {},
  deleteObjective: async ({ objectiveId, personId }: IDeleteObjective) => {},
}
