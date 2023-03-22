import { createContext, useContext, useEffect, useReducer } from 'react'
import { IEditorTo } from '../../@types/editores/IEditorTo'
import { IGenericObject } from '../../@types/editores/IGenericObject'
import { IError } from '../../@types/errors/IError'
import { ICreateCapituleRequest } from '../../api/booksRequests/types/ICreateCapituleRequest'
import { ICreateSceneRequest } from '../../api/booksRequests/types/ICreateSceneRequest'
import { IDeleteSceneRequest } from '../../api/booksRequests/types/IDeleteSceneRequest'
import { IReorderScenesRequest } from '../../api/booksRequests/types/IReorderScenesRequest'
import { ISetSceneToCompleteRequest } from '../../api/booksRequests/types/ISetSceneToCompleteRequest'
import { IUpdateCapituleRequest } from '../../api/booksRequests/types/IUpdateCapituleRequest'
import { IUpdateSceneRequest } from '../../api/booksRequests/types/IUpdateSceneRequest'
import { ICreateCommentDTO } from '../../api/dtos/ICreateNewCommentDTO'
import { ICreatePersonDTO } from '../../api/dtos/ICreatePersonDTO'
import { ICreateProjectDTO } from '../../api/dtos/ICreateProjectDTO'
import { IShareProjectDTO } from '../../api/dtos/IShareProjectDTO'
import { IUpdatePlotDTO } from '../../api/dtos/IUpdatePlotDTO'
import { IObjective } from '../../api/responsesTypes/IPersonsResponse'
import { Error } from '@components/usefull/Error'
import { UserContext } from '../user'
import { createBookFunction } from './functions/booksFunctions/createBookFunction'
import { createCapituleFunction } from './functions/booksFunctions/createCapituleFunction'
import { createSceneFunction } from './functions/booksFunctions/createSceneFunction'
import { deleteSceneFunction } from './functions/booksFunctions/deleteSceneFunction'
import { removeFrontCoverFunction } from './functions/booksFunctions/removeFrontCoverFunction'
import { reorderScenesFunction } from './functions/booksFunctions/reorderScenesFunction'
import { setSceneToCompleteFunction } from './functions/booksFunctions/setSceneToCompleteFunction'
import { updateCapituleFunction } from './functions/booksFunctions/updateCapituleFunction'
import { updateFrontCoverFunction } from './functions/booksFunctions/updateFrontCoverFunction'
import { updateSceneFunction } from './functions/booksFunctions/updateSceneFunction'
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
import { updateNameProjectFunction } from './functions/projectFunctions/updateNameProjectFunction'
import { updatePlotFunction } from './functions/projectFunctions/updatePlotFunction'
import { setErrorAction } from './reducer/actionsProjectsReducer'
import { projectsReducer } from './reducer/projectsReducer'
import { ICreateBook } from './types/interfaceFunctions/ICreateBook'
import { IDeleteImagePerson } from './types/interfaceFunctions/IDeleteImagePerson'
import { IDeleteImageProject } from './types/interfaceFunctions/IDeleteImageProject'
import { IDeleteObjective } from './types/interfaceFunctions/IDeleteObjective'
import { IQuitProject } from './types/interfaceFunctions/IQuitProject'
import { IUpdateFrontCover } from './types/interfaceFunctions/IUpdateFrontCover'
import { IUpdateNameProject } from './types/interfaceFunctions/IUpdateNameProject'
import {
  IProjectsContext,
  IProjectsContextProps,
} from './types/IProjectContext'
import { IDeleteCapituleRequest } from '@api/booksRequests/types/IDeleteCapituleRequest'
import { deleteCapituleFunction } from './functions/booksFunctions/deleteCapituleFunction'
import { IReorderCapitulesRequest } from '@api/booksRequests/types/IReorderCapitulesRequest'
import { reorderCapitulesFunction } from './functions/booksFunctions/reorderCapitulesFunction'
import { IAddGenreRequest } from '@api/booksRequests/types/IAddGenreRequest'
import { addGenreFunction } from './functions/booksFunctions/addGenreFunction'
import { IRemoveGenreRequest } from '@api/booksRequests/types/IRemoveGenreRequest'
import { removeGenreFunction } from './functions/booksFunctions/removeGenreFunction'
import { IUpdateBookRequest } from '@api/booksRequests/types/IUpdateBookRequest'
import { updateBookFunction } from './functions/booksFunctions/updateBookFunction'
import { deleteBookFunction } from './functions/booksFunctions/deleteBookFunction'
import { ICreateBoxRequest } from '@api/boxesRequests/types/ICreateBoxRequest'
import { createBoxFunction } from './functions/boxesFunctions/createBoxFunction'
import { ICreateArchiveInBoxRequest } from '@api/boxesRequests/types/ICreateArchiveInBoxRequest'
import { createArchiveInBoxFunction } from './functions/boxesFunctions/createArchiveInBoxFunction'
import { ISaveImagesRequest } from '@api/boxesRequests/types/ISaveImagesRequest'
import { saveArchiveImagesFunction } from './functions/boxesFunctions/saveArchiveImagesFunction'

export const ProjectsContext = createContext<IProjectsContext>(
  {} as IProjectsContext,
)

export function ProjectsProvider({ children }: IProjectsContextProps) {
  const [projectState, dispatch] = useReducer(projectsReducer, {
    projects: [],
    users: [],
    error: undefined,
    persons: [],
    books: [],
    boxes: [],
    loading: true,
  })

  const {
    userLogged,
    user,
    loading: loadingUser,
    error: errorUser,
  } = useContext(UserContext)

  const { projects, error, users, persons, books, boxes, loading } =
    projectState

  function setError(error: IError | undefined) {
    dispatch(setErrorAction(error))
  }

  async function getProjects() {
    return getProjectsFunction(dispatch)
  }

  async function createProject(newProjectInfos: ICreateProjectDTO) {
    const newProjectId = await createProjectFunction(newProjectInfos, dispatch)

    const welcomeProject = projects.find(
      (p) => p.id === '1242545b-56c9-41c0-9f98-addc9b5c5c65',
    )

    if (welcomeProject) {
      await quitProject({ projectId: welcomeProject.id })
    }

    return newProjectId
  }

  async function updateImageProject(projectId: string, file: File) {
    return updateImageProjectFunction(projectId, file, dispatch)
  }

  async function shareProject(newShare: IShareProjectDTO) {
    return shareProjectFunction(newShare, dispatch)
  }

  async function updatePlot(newPlot: IUpdatePlotDTO, projectId: string) {
    return updatePlotFunction(newPlot, projectId, dispatch)
  }

  async function commentInPlot(
    newComment: ICreateCommentDTO,
    projectId: string,
  ) {
    return commentInPlotFunction(newComment, projectId, dispatch)
  }

  async function responseCommentInPlot(
    newResponse: ICreateCommentDTO,
    projectId: string,
    commentId: string,
  ) {
    return responseCommentInPlotFunction(
      newResponse,
      projectId,
      commentId,
      dispatch,
    )
  }

  async function deleteProject(projectId: string) {
    return deleteProjectFunction(projectId, dispatch)
  }

  async function createNewPerson(person: ICreatePersonDTO) {
    return createNewPersonFunction(person, dispatch)
  }

  async function updateImageFromPerson(personId: string, file: File) {
    return updateImageFromPersonFunction(file, personId, dispatch)
  }

  async function updateObjective(
    objective: IObjective,
    personId: string,
    objectiveId: string,
  ) {
    return updateObjetiveOfPersonFunction(
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
    return createObjetiveOfPersonFunction(
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
    return saveRefObjectiveFunction(
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
    return commentInPersonFunction(newComment, personId, dispatch)
  }

  async function responseCommentToPerson(
    newResponse: ICreateCommentDTO,
    personId: string,
    commentId: string,
  ) {
    return responseCommentInPersonFunction(
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
    return createObjectGenericFunction(
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
    return saveRefObjectGenericFunction(
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
    return updateObjectGenericFunction(
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
    return deleteObjectGenericFunction(
      generic,
      personId,
      genericId,
      to,
      dispatch,
    )
  }

  async function unshareProject(userEmail: string, projectId: string) {
    return unshareProjectFunction(userEmail, projectId, dispatch)
  }

  async function updatePerson(person: ICreatePersonDTO, personId: string) {
    return updatedPersonFunction(person, personId, dispatch)
  }

  async function deleteImageProject({ projectId }: IDeleteImageProject) {
    return deleteImageProjectFunction({ projectId, dispatch })
  }

  async function deleteImagePerson({ personId }: IDeleteImagePerson) {
    return deleteImagePersonFunction({ personId, dispatch })
  }

  async function quitProject({ projectId }: IQuitProject) {
    return quitProjectFunction({ projectId, dispatch })
  }

  async function deleteObjective({ objectiveId, personId }: IDeleteObjective) {
    return deleteObjectiveFunction({ objectiveId, personId, dispatch })
  }

  async function createBook({ newBook, project }: ICreateBook) {
    return createBookFunction({
      dispatch,
      newBook,
      project,
      users,
      user: user!,
    })
  }

  async function updateFrontCover({ bookId, file }: IUpdateFrontCover) {
    return updateFrontCoverFunction({ bookId, file, dispatch })
  }

  async function removeFrontCover(bookId: string) {
    return removeFrontCoverFunction({ bookId, dispatch })
  }

  async function createCapitule(capitule: ICreateCapituleRequest) {
    return createCapituleFunction({
      newCapitule: capitule,
      dispatch,
    })
  }

  async function updateNameProject({ name, projectId }: IUpdateNameProject) {
    return updateNameProjectFunction({ dispatch, name, projectId })
  }

  async function updateCapitule(capitule: IUpdateCapituleRequest) {
    updateCapituleFunction({
      updatedCapitule: capitule,
      dispatch,
    })
  }

  async function createScene(scene: ICreateSceneRequest) {
    return createSceneFunction({
      newScene: scene,
      dispatch,
    })
  }

  async function setSceneToComplete(
    sceneToComplete: ISetSceneToCompleteRequest,
  ) {
    return setSceneToCompleteFunction({
      sceneToComplete,
      dispatch,
    })
  }

  async function deleteScene({
    bookId,
    capituleId,
    sceneId,
  }: IDeleteSceneRequest) {
    return deleteSceneFunction({ bookId, capituleId, sceneId, dispatch })
  }

  async function reorderScenes({
    bookId,
    capituleId,
    sequenceFrom,
    sequenceTo,
  }: IReorderScenesRequest) {
    return reorderScenesFunction({
      bookId,
      capituleId,
      sequenceFrom,
      sequenceTo,
      dispatch,
    })
  }

  async function reorderCapitules({
    bookId,
    sequenceFrom,
    sequenceTo,
  }: IReorderCapitulesRequest) {
    return reorderCapitulesFunction({
      bookId,
      sequenceFrom,
      sequenceTo,
      dispatch,
    })
  }

  async function updateScene(sceneUpdate: IUpdateSceneRequest) {
    return updateSceneFunction({
      sceneUpdate,
      dispatch,
    })
  }

  async function deleteCapitule({
    bookId,
    capituleId,
  }: IDeleteCapituleRequest) {
    return deleteCapituleFunction({
      bookId,
      capituleId,
      dispatch,
    })
  }

  async function addGenre(genreRequest: IAddGenreRequest) {
    return addGenreFunction({ genreRequest, dispatch })
  }

  async function removeGenre(genreRequest: IRemoveGenreRequest) {
    return removeGenreFunction({ genreRequest, dispatch })
  }

  async function updateBook(bookInfosUpdated: IUpdateBookRequest) {
    return updateBookFunction({ bookInfosUpdated, dispatch })
  }

  async function deleteBook(bookId: string) {
    return deleteBookFunction({ bookId, dispatch })
  }

  async function createBox(box: ICreateBoxRequest) {
    return createBoxFunction({ newBox: box, dispatch })
  }

  async function createArchiveInBox(archive: ICreateArchiveInBoxRequest) {
    return createArchiveInBoxFunction({ newArchive: archive, dispatch })
  }

  async function saveArchiveImages(images: ISaveImagesRequest) {
    return saveArchiveImagesFunction({ imagesToSave: images, dispatch })
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
        boxes,

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
        updateFrontCover,
        removeFrontCover,
        createCapitule,
        updateNameProject,
        updateCapitule,
        createScene,
        setSceneToComplete,
        deleteScene,
        reorderScenes,
        updateScene,
        deleteCapitule,
        reorderCapitules,
        addGenre,
        removeGenre,
        updateBook,
        deleteBook,
        createBox,
        createArchiveInBox,
        saveArchiveImages,
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
