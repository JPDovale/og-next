import { createContext, useContext, useReducer } from 'react'
import { IEditorTo } from '@@types/editores/IEditorTo'
import { IGenericObject } from '@@types/editores/IGenericObject'
import { ICreateCapituleRequest } from '@api/booksRequests/types/ICreateCapituleRequest'
import { ICreateSceneRequest } from '@api/booksRequests/types/ICreateSceneRequest'
import { IDeleteSceneRequest } from '@api/booksRequests/types/IDeleteSceneRequest'
import { IReorderScenesRequest } from '@api/booksRequests/types/IReorderScenesRequest'
import { ISetSceneToCompleteRequest } from '@api/booksRequests/types/ISetSceneToCompleteRequest'
import { IUpdateCapituleRequest } from '@api/booksRequests/types/IUpdateCapituleRequest'
import { IUpdateSceneRequest } from '@api/booksRequests/types/IUpdateSceneRequest'
import { ICreateCommentDTO } from '@api/dtos/ICreateNewCommentDTO'
import { ICreatePersonDTO } from '@api/dtos/ICreatePersonDTO'
import { IObjective } from '@api/responsesTypes/IPersonsResponse'
import { Error } from '@components/usefull/Error'
import { UserContext } from '../user'
import { createCapituleFunction } from './functions/booksFunctions/createCapituleFunction'
import { createSceneFunction } from './functions/booksFunctions/createSceneFunction'
import { deleteSceneFunction } from './functions/booksFunctions/deleteSceneFunction'
import { reorderScenesFunction } from './functions/booksFunctions/reorderScenesFunction'
import { setSceneToCompleteFunction } from './functions/booksFunctions/setSceneToCompleteFunction'
import { updateCapituleFunction } from './functions/booksFunctions/updateCapituleFunction'
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
import { responseCommentInPlotFunction } from './functions/projectFunctions/responseCommentInPlotFunction'
import { projectsReducer } from './reducer/projectsReducer'
import { IDeleteImagePerson } from './types/interfaceFunctions/IDeleteImagePerson'
import { IDeleteObjective } from './types/interfaceFunctions/IDeleteObjective'
import {
  IProjectsContext,
  IProjectsContextProps,
} from './types/IProjectContext'
import { IDeleteCapituleRequest } from '@api/booksRequests/types/IDeleteCapituleRequest'
import { deleteCapituleFunction } from './functions/booksFunctions/deleteCapituleFunction'
import { IReorderCapitulesRequest } from '@api/booksRequests/types/IReorderCapitulesRequest'
import { reorderCapitulesFunction } from './functions/booksFunctions/reorderCapitulesFunction'
import { ICreateBoxRequest } from '@api/boxesRequests/types/ICreateBoxRequest'
import { createBoxFunction } from './functions/boxesFunctions/createBoxFunction'
import { ICreateArchiveInBoxRequest } from '@api/boxesRequests/types/ICreateArchiveInBoxRequest'
import { createArchiveInBoxFunction } from './functions/boxesFunctions/createArchiveInBoxFunction'
import { ISaveImagesRequest } from '@api/boxesRequests/types/ISaveImagesRequest'
import { saveArchiveImagesFunction } from './functions/boxesFunctions/saveArchiveImagesFunction'
import { IDeleteArchiveBox } from './types/interfaceFunctions/IDeleteArchiveBox'
import { deleteArchiveBoxFunction } from './functions/boxesFunctions/deleteArchiveBoxFunction'
import { IDeleteImageInArchiveRequest } from '@api/boxesRequests/types/IDeleteImageInArchiveRequest'
import { deleteImageInArchiveFunction } from './functions/boxesFunctions/deleteImageInArchiveFunction'
import { IUpdateArchiveRequest } from '@api/boxesRequests/types/IUpdateArchiveRequest'
import { updateArchiveFunction } from './functions/boxesFunctions/updateArchiveFunction'
import { IUpdateBoxRequest } from '@api/boxesRequests/types/IUpdateBoxRequest'
import { updateBoxFunction } from './functions/boxesFunctions/updateBoxFunction'
import { deleteBoxFunction } from './functions/boxesFunctions/deleteBoxFunction'

export const ProjectsContext = createContext<IProjectsContext>(
  {} as IProjectsContext,
)

export function ProjectsProvider({ children }: IProjectsContextProps) {
  const [projectState, dispatch] = useReducer(projectsReducer, {
    users: [],
    persons: [],
    books: [],
    boxes: [],
    timelines: [],
  })

  const {
    userLogged,
    loading: loadingUser,
    error: errorUser,
  } = useContext(UserContext)

  const { users, persons, books, boxes, timelines } = projectState

  // async function createProject(newProjectInfos: ICreateProjectDTO) {
  //   const projectCreated = await createProjectFunction({
  //     newProject: newProjectInfos,
  //     dispatch,
  //   })

  //   const welcomeProject = projects.find(
  //     (p) => p.id === '1242545b-56c9-41c0-9f98-addc9b5c5c65',
  //   )

  //   if (welcomeProject) {
  //     await quitProject({ projectId: welcomeProject.id })
  //   }

  //   return projectCreated
  // }

  async function commentInPlot(
    newComment: ICreateCommentDTO,
    projectId: string,
  ) {
    return commentInPlotFunction({ comment: newComment, projectId, dispatch })
  }

  async function responseCommentInPlot(
    newResponse: ICreateCommentDTO,
    projectId: string,
    commentId: string,
  ) {
    return responseCommentInPlotFunction({
      responseComment: newResponse,
      projectId,
      commentId,
      dispatch,
    })
  }

  async function createNewPerson(person: ICreatePersonDTO) {
    return createNewPersonFunction({ newPerson: person, dispatch })
  }

  async function updateImageFromPerson(personId: string, file: File) {
    return updateImageFromPersonFunction({ file, personId, dispatch })
  }

  async function updateObjective(
    objective: IObjective,
    personId: string,
    objectiveId: string,
  ) {
    return updateObjetiveOfPersonFunction({
      objective,
      personId,
      objectiveId,
      dispatch,
    })
  }

  async function createObjective(
    objective: IObjective,
    personId: string,
    projectId: string,
  ) {
    return createObjetiveOfPersonFunction({
      objective,
      personId,
      projectId,
      dispatch,
    })
  }

  async function saveRefObjective(
    objective: IObjective,
    personId: string,
    projectId: string,
    refId: string,
  ) {
    return saveRefObjectiveFunction({
      objective,
      personId,
      projectId,
      refId,
      dispatch,
    })
  }

  async function commentInPerson(
    newComment: ICreateCommentDTO,
    personId: string,
  ) {
    return commentInPersonFunction({ newComment, personId, dispatch })
  }

  async function responseCommentToPerson(
    newResponse: ICreateCommentDTO,
    personId: string,
    commentId: string,
  ) {
    return responseCommentInPersonFunction({
      newResponse,
      personId,
      commentId,
      dispatch,
    })
  }

  async function createObjectGeneric(
    generic: IGenericObject,
    to: IEditorTo,
    personId: string,
    projectId: string,
  ) {
    return createObjectGenericFunction({
      generic,
      to,
      personId,
      projectId,
      dispatch,
    })
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
    return saveRefObjectGenericFunction({
      personId,
      projectId,
      refId,
      to,
      dispatch,
      subObjects,
    })
  }

  async function updateObjectGeneric(
    generic: IGenericObject,
    personId: string,
    genericId: string,
    to: IEditorTo,
  ) {
    return updateObjectGenericFunction({
      generic,
      personId,
      genericId,
      to,
      dispatch,
    })
  }

  async function deleteObjectGeneric(
    generic: IGenericObject,
    personId: string,
    genericId: string,
    to: IEditorTo,
  ) {
    return deleteObjectGenericFunction({
      generic,
      personId,
      genericId,
      to,
      dispatch,
    })
  }

  async function updatePerson(person: ICreatePersonDTO, personId: string) {
    return updatedPersonFunction({ person, personId, dispatch })
  }

  async function deleteImagePerson({ personId }: IDeleteImagePerson) {
    return deleteImagePersonFunction({ personId, dispatch })
  }

  async function deleteObjective({ objectiveId, personId }: IDeleteObjective) {
    return deleteObjectiveFunction({ objectiveId, personId, dispatch })
  }

  async function createCapitule(capitule: ICreateCapituleRequest) {
    return createCapituleFunction({
      newCapitule: capitule,
      dispatch,
    })
  }

  async function updateCapitule(capitule: IUpdateCapituleRequest) {
    return updateCapituleFunction({
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

  async function createBox(box: ICreateBoxRequest) {
    return createBoxFunction({ newBox: box, dispatch })
  }

  async function createArchiveInBox(archive: ICreateArchiveInBoxRequest) {
    return createArchiveInBoxFunction({ newArchive: archive, dispatch })
  }

  async function saveArchiveImages(images: ISaveImagesRequest) {
    return saveArchiveImagesFunction({ imagesToSave: images, dispatch })
  }

  async function deleteArchiveBox({ archiveId, boxId }: IDeleteArchiveBox) {
    return deleteArchiveBoxFunction({ archiveId, boxId, dispatch })
  }

  async function deleteImageInArchive({
    archiveId,
    boxId,
    imageId,
  }: IDeleteImageInArchiveRequest) {
    return deleteImageInArchiveFunction({ archiveId, boxId, imageId, dispatch })
  }

  async function updateArchive({
    archiveId,
    boxId,
    description,
    title,
  }: IUpdateArchiveRequest) {
    return updateArchiveFunction({
      archiveId,
      boxId,
      description,
      title,
      dispatch,
    })
  }

  async function updateBox({
    boxId,
    name,
    description,
    tags,
  }: IUpdateBoxRequest) {
    return updateBoxFunction({ boxId, name, description, tags, dispatch })
  }

  async function deleteBox(boxId: string) {
    return deleteBoxFunction({ boxId, dispatch })
  }

  // useEffect(() => {
  //   if (!userLogged) return
  //   getProjects()
  // }, [userLogged])

  return (
    <ProjectsContext.Provider
      value={{
        // projects,
        users,
        persons,
        books,
        boxes,
        timelines,

        commentInPlot,
        responseCommentInPlot,
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
        updatePerson,
        deleteImagePerson,
        deleteObjective,
        createCapitule,
        updateCapitule,
        createScene,
        setSceneToComplete,
        deleteScene,
        reorderScenes,
        updateScene,
        deleteCapitule,
        reorderCapitules,
        createBox,
        createArchiveInBox,
        saveArchiveImages,
        deleteArchiveBox,
        deleteImageInArchive,
        updateArchive,
        updateBox,
        deleteBox,
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
