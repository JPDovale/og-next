import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react'
import { IEditorTo } from '../../@types/editores/IEditorTo'
import { IGenericObject } from '../../@types/editores/IGenericObject'
import { IError } from '../../@types/errors/IError'
import { ICreateCommentDTO } from '../../api/dtos/ICreateNewCommentDTO'
import { ICreatePersonDTO } from '../../api/dtos/ICreatePersonDTO'
import { ICreateProjectDTO } from '../../api/dtos/ICreateProjectDTO'
import { IShareProjectDTO } from '../../api/dtos/IShareProjectDTO'
import { IUpdatePlotDTO } from '../../api/dtos/IUpdatePlotDTO'
import { IObjective } from '../../api/responsesTypes/IPersonsResponse'
import { UserContext } from '../user'
import { commentInPersonFunction } from './functions/personsFunctions/commentInPersonFunction'
import { createNewPersonFunction } from './functions/personsFunctions/createNewPersonFunction'
import { createObjectGenericFunction } from './functions/personsFunctions/createObjectGenericFunction'
import { createObjetiveOfPersonFunction } from './functions/personsFunctions/createObjetiveOfPersonFunction'
import { deleteObjectGenericFunction } from './functions/personsFunctions/deleteObjectGenericFunction'
import { responseCommentInPersonFunction } from './functions/personsFunctions/responseCommentInPersonFunction'
import { saveRefObjectGenericFunction } from './functions/personsFunctions/saveRefObjectGenericFunction'
import { saveRefObjectiveFunction } from './functions/personsFunctions/saveRefObjectiveFunction'
import { updateImageFromPersonFunction } from './functions/personsFunctions/updateImageFromPersonFunction'
import { updateObjectGenericFunction } from './functions/personsFunctions/updateObjectGenericFunction'
import { updateObjetiveOfPersonFunction } from './functions/personsFunctions/updateObjetiveOfPersonFunction'
import { updatedPersonFunction } from './functions/personsFunctions/updatePersonFunction'
import { commentInPlotFunction } from './functions/projectFunctions/commentInPlotFunction'
import { createProjectFunction } from './functions/projectFunctions/createProjectFunction'
import { deleteProjectFunction } from './functions/projectFunctions/deleteProjectFunction'
import { getProjectsFunction } from './functions/projectFunctions/getProjectsFunction'
import { responseCommentInPlotFunction } from './functions/projectFunctions/responseCommentInPlotFunction'
import { shareProjectFunction } from './functions/projectFunctions/shareProjectFunction'
import { unshareProjectFunction } from './functions/projectFunctions/unshareProjectFunction'
import { updateImageProjectFunction } from './functions/projectFunctions/updateImageProjectFunction'
import { updatePlotFunction } from './functions/projectFunctions/updatePlotFunction'
import { projectsDefaultValues } from './initialValues'
import { setErrorAction } from './reducer/actionsProjectsReducer'
import { projectsReducer } from './reducer/projectsReducer'
import {
  IProjectsContext,
  IProjectsContextProps,
} from './types/IProjectContext'

export const ProjectsContext = createContext<IProjectsContext>(
  projectsDefaultValues,
)

export function ProjectsProvider({ children }: IProjectsContextProps) {
  const [loading, setLoading] = useState(projectsDefaultValues.loading)

  const [projectState, dispatch] = useReducer(projectsReducer, {
    projects: [],
    users: [],
    error: undefined,
    persons: [],
  })

  const { userLogged } = useContext(UserContext)

  const { projects, error, users, persons } = projectState

  function setError(error: IError | undefined) {
    dispatch(setErrorAction(error))
  }

  async function getProjects() {
    setLoading(true)
    await getProjectsFunction(dispatch)
    setLoading(false)
  }

  async function createProject(newProjectInfos: ICreateProjectDTO) {
    setLoading(true)
    const newProjectId = await createProjectFunction(newProjectInfos, dispatch)
    setLoading(false)
    return newProjectId
  }

  async function updateImageProject(projectId: string, file: File) {
    setLoading(true)
    const isModified = await updateImageProjectFunction(
      projectId,
      file,
      dispatch,
    )
    setLoading(false)
    return isModified
  }

  async function shareProject(newShare: IShareProjectDTO) {
    const response = await shareProjectFunction(newShare, dispatch)
    return response
  }

  async function updatePlot(newPlot: IUpdatePlotDTO, projectId: string) {
    setLoading(true)
    await updatePlotFunction(newPlot, projectId, dispatch)
    setLoading(false)
  }

  async function commentInPlot(
    newComment: ICreateCommentDTO,
    projectId: string,
  ) {
    setLoading(true)
    await commentInPlotFunction(newComment, projectId, dispatch)
    setLoading(false)
  }

  async function responseCommentInPlot(
    newResponse: ICreateCommentDTO,
    projectId: string,
    commentId: string,
  ) {
    setLoading(true)

    await responseCommentInPlotFunction(
      newResponse,
      projectId,
      commentId,
      dispatch,
    )
    setLoading(false)
  }

  async function deleteProject(projectId: string) {
    setLoading(true)
    await deleteProjectFunction(projectId, dispatch)
    setLoading(false)
  }

  async function createNewPerson(person: ICreatePersonDTO) {
    return await createNewPersonFunction(person, dispatch)
  }

  async function updateImageFromPerson(personId: string, file: File) {
    return await updateImageFromPersonFunction(file, personId, dispatch)
  }

  async function updateObjective(
    objective: IObjective,
    personId: string,
    objectiveId: string,
  ) {
    return await updateObjetiveOfPersonFunction(
      objective,
      personId,
      objectiveId,
      dispatch,
    )
  }

  async function createObjective(
    objective: IObjective,
    personId: string,
    projectId: string,
  ) {
    return await createObjetiveOfPersonFunction(
      objective,
      personId,
      projectId,
      dispatch,
    )
  }

  async function saveRefObjective(
    objective: IObjective,
    personId: string,
    projectId: string,
    refId: string,
  ) {
    return await saveRefObjectiveFunction(
      objective,
      personId,
      projectId,
      refId,
      dispatch,
    )
  }

  async function commentInPerson(
    newComment: ICreateCommentDTO,
    personId: string,
  ) {
    return await commentInPersonFunction(newComment, personId, dispatch)
  }

  async function responseCommentToPerson(
    newResponse: ICreateCommentDTO,
    personId: string,
    commentId: string,
  ) {
    return await responseCommentInPersonFunction(
      newResponse,
      personId,
      commentId,
      dispatch,
    )
  }

  async function createObjectGeneric(
    generic: IGenericObject,
    to: IEditorTo,
    personId: string,
    projectId: string,
  ) {
    return await createObjectGenericFunction(
      generic,
      to,
      personId,
      projectId,
      dispatch,
    )
  }

  async function saveRefObjectGeneric(
    personId: string,
    projectId: string,
    refId: string,
    to: IEditorTo,
    subObjects?: Array<{
      title: string
      description: string
    }>,
  ) {
    return await saveRefObjectGenericFunction(
      personId,
      projectId,
      refId,
      to,
      dispatch,
      subObjects,
    )
  }

  async function updateObjectGeneric(
    generic: IGenericObject,
    personId: string,
    genericId: string,
    to: IEditorTo,
  ) {
    return await updateObjectGenericFunction(
      generic,
      personId,
      genericId,
      to,
      dispatch,
    )
  }

  async function deleteObjectGeneric(
    generic: IGenericObject,
    personId: string,
    genericId: string,
    to: IEditorTo,
  ) {
    return await deleteObjectGenericFunction(
      generic,
      personId,
      genericId,
      to,
      dispatch,
    )
  }

  async function unshareProject(userEmail: string, projectId: string) {
    return await unshareProjectFunction(userEmail, projectId, dispatch)
  }

  async function updatePerson(person: ICreatePersonDTO, personId: string) {
    return await updatedPersonFunction(person, personId, dispatch)
  }

  useEffect(() => {
    if (!userLogged) return
    getProjects()
  }, [userLogged])

  return (
    <ProjectsContext.Provider
      value={{
        loading,
        projects,
        users,
        persons,

        error,
        setError,

        createProject,
        updateImageProject,
        shareProject,
        updatePlot,
        commentInPlot,
        responseCommentInPlot,
        deleteProject,

        commentInPerson,
        createNewPerson,
        createObjectGeneric,
        createObjective,
        deleteObjectGeneric,
        responseCommentToPerson,
        saveRefObjectGeneric,
        saveRefObjective,
        updateImageFromPerson,
        updateObjectGeneric,
        updateObjective,
        unshareProject,
        updatePerson,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  )
}
