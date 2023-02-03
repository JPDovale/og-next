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
import { Error } from '../../components/Error'
import { UserContext } from '../user'
import { createBookFunction } from './functions/booksFunctions/createBookFunction'
import { commentInPersonFunction } from './functions/personsFunctions/commentInPersonFunction'
import { createNewPersonFunction } from './functions/personsFunctions/createNewPersonFunction'
import { createObjectGenericFunction } from './functions/personsFunctions/createObjectGenericFunction'
import { createObjetiveOfPersonFunction } from './functions/personsFunctions/createObjetiveOfPersonFunction'
import { deleteImagePersonFunction } from './functions/personsFunctions/deleteImagePersonFunction'
import { deleteObjectGenericFunction } from './functions/personsFunctions/deleteObjectGenericFunction'
import { deleteObjectiveFunction } from './functions/personsFunctions/deleteObjectiveFunction'
import { responseCommentInPersonFunction } from './functions/personsFunctions/responseCommentInPersonFunction'
import { saveRefObjectGenericFunction } from './functions/personsFunctions/saveRefObjectGenericFunction'
import { saveRefObjectiveFunction } from './functions/personsFunctions/saveRefObjectiveFunction'
import { updateImageFromPersonFunction } from './functions/personsFunctions/updateImageFromPersonFunction'
import { updateObjectGenericFunction } from './functions/personsFunctions/updateObjectGenericFunction'
import { updateObjetiveOfPersonFunction } from './functions/personsFunctions/updateObjetiveOfPersonFunction'
import { updatedPersonFunction } from './functions/personsFunctions/updatePersonFunction'
import { commentInPlotFunction } from './functions/projectFunctions/commentInPlotFunction'
import { createProjectFunction } from './functions/projectFunctions/createProjectFunction'
import { deleteImageProjectFunction } from './functions/projectFunctions/deleteImageProjectFunction'
import { deleteProjectFunction } from './functions/projectFunctions/deleteProjectFunction'
import { getProjectsFunction } from './functions/projectFunctions/getProjectsFunction'
import { quitProjectFunction } from './functions/projectFunctions/quitProjectFunction'
import { responseCommentInPlotFunction } from './functions/projectFunctions/responseCommentInPlotFunction'
import { shareProjectFunction } from './functions/projectFunctions/shareProjectFunction'
import { unshareProjectFunction } from './functions/projectFunctions/unshareProjectFunction'
import { updateImageProjectFunction } from './functions/projectFunctions/updateImageProjectFunction'
import { updatePlotFunction } from './functions/projectFunctions/updatePlotFunction'
import { projectsDefaultValues } from './initialValues'
import { setErrorAction } from './reducer/actionsProjectsReducer'
import { projectsReducer } from './reducer/projectsReducer'
import { ICreateBook } from './types/interfaceFunctions/ICreateBook'
import { IDeleteImagePerson } from './types/interfaceFunctions/IDeleteImagePerson'
import { IDeleteImageProject } from './types/interfaceFunctions/IDeleteImageProject'
import { IDeleteObjective } from './types/interfaceFunctions/IDeleteObjective'
import { IQuitProject } from './types/interfaceFunctions/IQuitProject'
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
    books: [],
  })

  const {
    userLogged,
    user,
    loading: loadingUser,
    error: errorUser,
  } = useContext(UserContext)

  const { projects, error, users, persons, books } = projectState

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

    const welcomeProjectId = projects.find(
      (p) => p.id === '1242545b-56c9-41c0-9f98-addc9b5c5c65',
    )?.id
    if (welcomeProjectId) {
      await quitProject({ projectId: welcomeProjectId })
    }

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
    setLoading(true)
    const isCreated = await createNewPersonFunction(person, dispatch)
    setLoading(false)
    return isCreated
  }

  async function updateImageFromPerson(personId: string, file: File) {
    setLoading(true)
    const isUpdated = await updateImageFromPersonFunction(
      file,
      personId,
      dispatch,
    )
    setLoading(false)
    return isUpdated
  }

  async function updateObjective(
    objective: IObjective,
    personId: string,
    objectiveId: string,
  ) {
    setLoading(true)
    const isUpdated = await updateObjetiveOfPersonFunction(
      objective,
      personId,
      objectiveId,
      dispatch,
    )
    setLoading(false)
    return isUpdated
  }

  async function createObjective(
    objective: IObjective,
    personId: string,
    projectId: string,
  ) {
    setLoading(true)
    const isCreated = await createObjetiveOfPersonFunction(
      objective,
      personId,
      projectId,
      dispatch,
    )
    setLoading(false)
    return isCreated
  }

  async function saveRefObjective(
    objective: IObjective,
    personId: string,
    projectId: string,
    refId: string,
  ) {
    setLoading(true)
    const isRefCreated = await saveRefObjectiveFunction(
      objective,
      personId,
      projectId,
      refId,
      dispatch,
    )
    setLoading(false)
    return isRefCreated
  }

  async function commentInPerson(
    newComment: ICreateCommentDTO,
    personId: string,
  ) {
    setLoading(true)
    await commentInPersonFunction(newComment, personId, dispatch)
    setLoading(false)
  }

  async function responseCommentToPerson(
    newResponse: ICreateCommentDTO,
    personId: string,
    commentId: string,
  ) {
    setLoading(true)
    await responseCommentInPersonFunction(
      newResponse,
      personId,
      commentId,
      dispatch,
    )
    setLoading(false)
  }

  async function createObjectGeneric(
    generic: IGenericObject,
    to: IEditorTo,
    personId: string,
    projectId: string,
  ) {
    setLoading(true)
    const isCreated = await createObjectGenericFunction(
      generic,
      to,
      personId,
      projectId,
      dispatch,
    )
    setLoading(false)
    return isCreated
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
    setLoading(true)
    const isRefCreated = await saveRefObjectGenericFunction(
      personId,
      projectId,
      refId,
      to,
      dispatch,
      subObjects,
    )
    setLoading(false)
    return isRefCreated
  }

  async function updateObjectGeneric(
    generic: IGenericObject,
    personId: string,
    genericId: string,
    to: IEditorTo,
  ) {
    setLoading(true)
    const isUpdated = await updateObjectGenericFunction(
      generic,
      personId,
      genericId,
      to,
      dispatch,
    )
    setLoading(false)
    return isUpdated
  }

  async function deleteObjectGeneric(
    generic: IGenericObject,
    personId: string,
    genericId: string,
    to: IEditorTo,
  ) {
    setLoading(true)
    await deleteObjectGenericFunction(
      generic,
      personId,
      genericId,
      to,
      dispatch,
    )
    setLoading(false)
  }

  async function unshareProject(userEmail: string, projectId: string) {
    setLoading(true)
    await unshareProjectFunction(userEmail, projectId, dispatch)
    setLoading(false)
  }

  async function updatePerson(person: ICreatePersonDTO, personId: string) {
    setLoading(true)
    await updatedPersonFunction(person, personId, dispatch)
    setLoading(false)
  }

  async function deleteImageProject({ projectId }: IDeleteImageProject) {
    setLoading(true)
    await deleteImageProjectFunction({ projectId, dispatch })
    setLoading(false)
  }

  async function deleteImagePerson({ personId }: IDeleteImagePerson) {
    setLoading(true)
    await deleteImagePersonFunction({ personId, dispatch })
    setLoading(false)
  }

  async function quitProject({ projectId }: IQuitProject) {
    await quitProjectFunction({ projectId, dispatch })
  }

  async function deleteObjective({ objectiveId, personId }: IDeleteObjective) {
    await deleteObjectiveFunction({ objectiveId, personId, dispatch })
  }

  async function createBook({ newBook, project }: ICreateBook) {
    setLoading(true)
    const response = await createBookFunction({
      dispatch,
      newBook,
      project,
      users,
      user: user!,
    })
    setLoading(false)
    return response
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
        books,

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
        deleteImageProject,
        deleteImagePerson,
        quitProject,
        deleteObjective,
        createBook,
      }}
    >
      {!loadingUser && !userLogged && errorUser?.title === 'Access denied' ? (
        <Error isRedirectable />
      ) : (
        children
      )}
    </ProjectsContext.Provider>
  )
}
