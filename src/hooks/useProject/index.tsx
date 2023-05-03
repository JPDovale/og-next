import { getProjectRequest } from '@api/projectsRequests'
import { IPersonsResponse } from '@api/responsesTypes/IPersonsResponse'
import { IProjectResponse } from '@api/responsesTypes/IProjectResponse'
import { refreshSessionRequest } from '@api/userRequest'
import { useProjects } from '@hooks/useProjects'
import { useUser } from '@hooks/useUser'
import { getDate } from '@utils/dates/getDate'
import { useQuery } from 'react-query'
import { createBook } from './events/createBook'
import { deleteProject } from './events/delete'
import { quitProject } from './events/quit'
import { shareProject } from './events/share'
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

      if (response.errorMessage === 'Invalid token' && !isRefreshingSession) {
        const refresh = await refreshSessionRequest()

        if (!refresh.errorMessage) {
          response = await getProjectRequest(id)
        } else {
          errorMessage = refresh.errorMessage
          errorTitle = refresh.errorTitle
        }
      }

      const project = response.project as IProjectResponse

      return { project, errorMessage, errorTitle }
    },
    {
      staleTime: 1000 * 60 * 60, // 1 hour
    },
  )

  const refetchProject = refetch
  const loadingProject = !(!isLoading && !loadingUser)
  const project = data?.project ?? null
  const createdAt = project?.created_at
    ? getDate(project.created_at)
    : 'Carregando...'
  const updatedAt = project?.updated_at
    ? getDate(project.updated_at)
    : 'Carregando...'
  const projectName = project?.name ?? 'Carregando...'
  const projectType = project?.type ?? 'Carregando...'
  const projectImage = project?.image_url ?? undefined
  let permission: 'edit' | 'view' | 'comment' = 'view'
  const usersInProject: IUserInProject[] = []
  const usersWithPermissionEdit: IUserInProject[] = []

  project?.users_with_access_comment?.users.map((user) => {
    usersInProject.push({
      name: user.name ?? 'Carregando...',
      username: user.username ?? 'Carregando...',
      email: user.email ?? 'Carregando...',
      id: user.id,
      avatar_url: user.avatar_url ?? undefined,
    })
    return usersWithPermissionEdit.push({
      name: user.name ?? 'Carregando...',
      username: user.username ?? 'Carregando...',
      email: user.email ?? 'Carregando...',
      id: user.id,
      avatar_url: user.avatar_url ?? undefined,
    })
  })
  project?.users_with_access_view?.users.map((user) =>
    usersInProject.push({
      name: user.name ?? 'Carregando...',
      username: user.username ?? 'Carregando...',
      email: user.email ?? 'Carregando...',
      id: user.id,
      avatar_url: user.avatar_url ?? undefined,
    }),
  )
  project?.users_with_access_edit?.users.map((user) =>
    usersInProject.push({
      name: user.name ?? 'Carregando...',
      username: user.username ?? 'Carregando...',
      email: user.email ?? 'Carregando...',
      id: user.id,
      avatar_url: user.avatar_url ?? undefined,
    }),
  )

  if (!loadingProject && project) {
    if (project?.user.id !== user?.id) {
      const userWithAccessComment =
        !!project.users_with_access_comment?.users.find(
          (userWithAccess) => userWithAccess.id === user?.id,
        )
      const userWithAccessEdit = !!project.users_with_access_edit?.users.find(
        (userWithAccess) => userWithAccess.id === user?.id,
      )
      const userWithAccessView = !!project.users_with_access_view?.users.find(
        (userWithAccess) => userWithAccess.id === user?.id,
      )

      if (userWithAccessView) {
        permission = 'view'
      } else if (userWithAccessComment) {
        permission = 'comment'
      } else if (userWithAccessEdit) {
        permission = 'edit'
      } else {
        permission = 'view'
      }
    } else {
      permission = 'edit'
    }
  }

  function findBook(id: string) {
    const book = project?.books?.find((book) => book.id === id)

    const bookTitle = book?.title
      ? `${book?.title}${book?.subtitle ? ` - ${book?.subtitle}` : ''}`
      : 'Carregando...'
    const literaryGenre = book?.literary_genre
      ? book?.literary_genre
      : 'Carregando...'
    const createdAt = book?.created_at
      ? getDate(book.created_at)
      : 'Carregando...'
    const updatedAt = book?.updated_at
      ? getDate(book.updated_at)
      : 'Carregando...'
    const isbn = loadingProject
      ? 'Carregando...'
      : !loadingProject && !book?.isbn
      ? 'Você ainda não definiu seu isnb'
      : book?.isbn
    const bookFrontCover = book?.front_cover_url ?? undefined

    return {
      book: book ?? null,
      bookTitle,
      literaryGenre,
      createdAt,
      updatedAt,
      isbn,
      bookFrontCover,
    }
  }

  function findPerson(id: string) {
    const person = project?.persons?.find((person) => person.id === id)

    const personName = person?.name
      ? `${person.name} ${person.last_name}`
      : 'Carregando...'
    const personImage = person?.image_url ?? undefined
    const createdAt = person?.created_at
      ? getDate(person.created_at)
      : 'Carregando...'
    const updatedAt = person?.updated_at
      ? getDate(person.updated_at)
      : 'Carregando...'

    return {
      person,
      personName,
      personImage,
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
      const filteredPersons = project?.persons?.filter((person) => {
        const personToRemove = ids?.find((id) => id === person.id)

        if (personToRemove) return false

        return true
      }) as IPersonsResponse[]

      return filteredPersons ?? []
    } else {
      const queryPersons = ids?.map((id) => {
        const person = project?.persons?.find((person) => person.id === id)

        return person
      })

      const persons = queryPersons?.filter(
        (queriedPerson) => queriedPerson !== undefined,
      ) as IPersonsResponse[]

      return persons ?? []
    }
  }

  function queryPerson(query: string) {
    const filteredPersons = project?.persons?.filter(
      (person) =>
        person.name
          .toLowerCase()
          .trim()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .includes(query.toLowerCase().trim()) ||
        person.last_name
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

  const callEvent: ICallEvent = {
    delete: () => deleteProject(project!.id, refetchProjects),
    quit: () => quitProject(project!.id, refetchProjects),
    share: (shareInfos) =>
      shareProject(project!.id, shareInfos, refetchProjects),
    updatePlot: (plot) => {},
    updateName: (newName) => {},
    updateImage: (file) => {},
    unshare: (email) => {},
    removeImage: () => {},

    createBook: (newBook) => createBook(project!.id, newBook, refetchProject),
  }

  return {
    project,
    createdAt,
    updatedAt,
    projectName,
    projectType,
    projectImage,
    refetchProject,
    callEvent,

    loadingProject,
    booksThisProject: project?.books ?? [],
    personsThisProject: project?.persons ?? [],
    permission,
    timelineOfProject: [],
    usersInProject: usersInProject ?? [],
    usersWithPermissionEdit: usersWithPermissionEdit ?? [],

    findBook,
    findPerson,
    queryPerson,
    findManyPersons,
  }
}
