import { getProjectRequest } from '@api/projectsRequests'
import { IProject } from '@api/responsesTypes/project/IProject'
import { refreshSessionRequest } from '@api/userRequest'
import { useProjects } from '@hooks/useProjects'
import { useUser } from '@hooks/useUser'
import { orderDatesOfTimelines } from '@services/orderElements'
import { getDate } from '@utils/dates/getDate'
import { useQuery } from 'react-query'
import { changeDoneTimeEvent } from './events/changeDoneTimeEvent'
import { changeFeaturesUsing } from './events/changeFeaturesUsing'
import { commentInPlot } from './events/commentInPlot'
import { copyTimeLineToProject } from './events/copyTimeLineToProject'
import { createBook } from './events/createBook'
import { createPerson } from './events/createPerson'
import { createTimeEventOnMainTimeLien } from './events/createTimeEventOnMainTimeLien'
import { deleteProject } from './events/delete'
import { deleteImage } from './events/deleteImage'
import { quitProject } from './events/quit'
import { responseCommentInPlot } from './events/responseCommentInPlot'
import { shareProject } from './events/share'
import { unshare } from './events/unshare'
import { updateImage } from './events/updateImage'
import { updateInitialDate } from './events/updateInitialDate'
import { updateName } from './events/updateName'
import { updatePlot } from './events/updatePlot'
import { ICallEvent } from './types/ICallEvent'

export interface IUserInProject {
  id: string
  avatar_url: string | undefined
  name: string
  username: string
  email: string
}

export function useProject(id: string) {
  const { loadingUser, user, isRefreshingSession } = useUser()
  const { refetchProjects } = useProjects()

  const { data, isLoading, refetch } = useQuery(
    `project-${id}`,
    async () => {
      if (!id || isRefreshingSession) return

      let response = await getProjectRequest(id)
      let errorMessage: string | null = null
      let errorTitle: string | null = null

      if (response.error?.title === 'Login failed' && !isRefreshingSession) {
        const refresh = await refreshSessionRequest()

        if (refresh.ok) {
          response = await getProjectRequest(id)
        } else {
          errorMessage = refresh.error?.message ?? null
          errorTitle = refresh.error?.title ?? null
        }
      }

      const project = response.data?.project as IProject

      return { project, errorMessage, errorTitle }
    },
    {
      staleTime: 1000 * 60 * 60, // 1 hour
    },
  )

  const refetchProject = refetch
  const loadingProject = !(!isLoading && !loadingUser)
  const project = data?.project ?? null
  const projectName = project?.name || 'Carregando...'

  const createdAt = project?.createdAt
    ? getDate(project.createdAt)
    : 'Carregando...'

  const updatedAt = project?.updatedAt
    ? getDate(project.updatedAt)
    : 'Carregando...'

  let permission: 'edit' | 'view' | 'comment' = 'view'

  const mainTimeLine = project?.collections.timeLine.itens?.find(
    (timeLine) => !timeLine.infos.isAlternative,
  )
  const todoFirst = project?.collections.timeLine.itens?.find(
    (timeline) => timeline.infos.type === 'to_do',
  )
  const anotherTodos = project?.collections.timeLine.itens?.filter(
    (timeline) => timeline.id !== todoFirst?.id,
  )

  if (!loadingProject && project) {
    if (project?.creator.id !== user?.account.id) {
      const userInProject = project.users.find((u) => u.id === user?.account.id)

      permission = userInProject?.permission ?? 'view'
    } else {
      permission = 'edit'
    }
  }

  function findBook(id: string) {
    const book = project?.collections.book.itens?.find((book) => book.id === id)

    const createdAt = book?.infos.createdAt
      ? getDate(book?.infos.createdAt)
      : 'Carregando...'

    const updatedAt = book?.infos.updatedAt
      ? getDate(book.infos.updatedAt)
      : 'Carregando...'

    return {
      book: book ?? null,
      createdAt,
      updatedAt,
    }
  }

  function findPerson(id: string) {
    const person = project?.collections.person.itens.find(
      (person) => person.id === id,
    )

    const createdAt = person?.infos.createdAt
      ? getDate(person.infos.createdAt)
      : 'Carregando...'

    const updatedAt = person?.infos.updatedAt
      ? getDate(person.infos.updatedAt)
      : 'Carregando...'

    return {
      person,
      createdAt,
      updatedAt,
    }
  }

  function findManyPersons(
    ids: string[],
    config?: {
      reverse: boolean
    },
  ) {
    const reverse = config?.reverse ?? false

    if (reverse) {
      const filteredPersons = project?.collections.person.itens.filter(
        (person) => {
          const personToRemove = ids?.find((id) => id === person.id)

          if (personToRemove) return false

          return true
        },
      )

      return filteredPersons ?? []
    } else {
      const queryPersons = ids?.map((id) => {
        const person = project?.collections.person.itens.find(
          (person) => person.id === id,
        )

        return person
      })

      const persons = queryPersons?.filter(
        (queriedPerson) => queriedPerson !== undefined,
      )

      return persons ?? []
    }
  }

  function queryPerson(query: string) {
    const filteredPersons = project?.collections.person.itens?.filter(
      (person) =>
        person.name.full
          .toLowerCase()
          .trim()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .includes(query.toLowerCase().trim()) ||
        person.history
          .toLowerCase()
          .trim()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .includes(query.toLowerCase().trim()),
    )

    return filteredPersons
  }

  function findTimeLine(id: string) {
    const timeLine = project?.collections.timeLine.itens?.find(
      (timeLine) => timeLine.id === id,
    )
    const eventsInChronologicOrd = orderDatesOfTimelines(
      timeLine?.collections.timeEvent.itens ?? [],
    )

    return {
      timeLine,
      eventsInChronologicOrd,
    }
  }

  const callEvent: ICallEvent = {
    delete: () => deleteProject(project!.id, refetchProjects),
    quit: () => quitProject(project!.id, refetchProjects),
    share: (shareInfos) =>
      shareProject(project!.id, shareInfos, refetchProjects),
    updatePlot: (plot) => updatePlot(project!.id, plot, refetchProject),
    updateName: (newName) =>
      updateName(project!.id, newName, refetchProject, refetchProjects),
    updateImage: (file) =>
      updateImage(project!.id, file, refetchProject, refetchProjects),
    removeImage: () =>
      deleteImage(project!.id, refetchProject, refetchProjects),
    unshare: (email) =>
      unshare(project!.id, email, refetchProject, refetchProjects),

    createBook: (newBook) =>
      createBook(project!.id, newBook, refetchProject, refetchProjects),

    commentInPlot: (newComment) =>
      commentInPlot(project!.id, newComment, refetchProject),

    responseCommentInPlot: (newResponse) =>
      responseCommentInPlot(project!.id, newResponse, refetchProject),

    createPerson: (newPerson) =>
      createPerson(project!.id, newPerson, refetchProject, refetchProjects),

    changeFeaturesUsing: (features) =>
      changeFeaturesUsing(project!.id, features, refetchProject),

    updateInitialDate: (newDate) =>
      updateInitialDate(project!.id, newDate, refetchProject),

    createTimeEventOnMainTimeLien: (newTimeEvent) =>
      createTimeEventOnMainTimeLien(project!.id, newTimeEvent, refetchProject),

    copyTimeLineToProject: (timeLineId) =>
      copyTimeLineToProject(project!.id, timeLineId, refetchProject),

    changeDoneTimeEvent: (timeEventId, timeLineId) =>
      changeDoneTimeEvent(project!.id, timeLineId, timeEventId, refetchProject),
  }

  return {
    project,
    createdAt,
    updatedAt,
    projectName,
    refetchProject,
    callEvent,

    loadingProject,
    booksThisProject: project?.collections.book.itens ?? [],
    personsThisProject: project?.collections.person.itens ?? [],
    permission,
    timelineOfProject: [],
    mainTimeLine,
    todoFirst,
    anotherTodos,

    findBook,
    findPerson,
    queryPerson,
    findManyPersons,
    findTimeLine,
  }
}
