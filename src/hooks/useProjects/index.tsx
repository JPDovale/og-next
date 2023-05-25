import { getProjectsRequest } from '@api/projectsRequests'
import { refreshSessionRequest } from '@api/userRequest'
import { InterfaceContext } from '@contexts/interface'
import { useUser } from '@hooks/useUser'
import { orderElements } from '@services/orderElements'
import { getDate } from '@utils/dates/getDate'
import { useContext, useMemo } from 'react'
import { useQuery } from 'react-query'
import { IProjectPreview, IUserInProject } from './entities/IProjectPreview'
import { createProject } from './events/createProject'
import { ICallEvent } from './types/ICallEvent'

interface IFindProjectResponse {
  project: IProjectPreview | null

  projectName: string
  projectImage: string | undefined
  createdAt: string
  usersInProject: IUserInProject[]
}

interface IUseProjectsParams {
  config?: {
    query?: string
  }
}

export function useProjects(params?: IUseProjectsParams) {
  const config = params?.config ?? {
    query: undefined,
  }

  const { user, loadingUser, isRefreshingSession } = useUser()
  const { orderBy } = useContext(InterfaceContext)

  const { data, isLoading, refetch, isFetching } = useQuery(
    'projects',
    async () => {
      let response = await getProjectsRequest()
      let errorMessage: string | null = null
      let errorTitle: string | null = null

      if (response.error?.title === 'Login failed' && !isRefreshingSession) {
        const refresh = await refreshSessionRequest()

        if (refresh.ok) {
          response = await getProjectsRequest()
        } else {
          errorMessage = refresh.error?.message ?? null
          errorTitle = refresh.error?.title ?? null
        }
      }

      const projects = response.projects as IProjectPreview[]

      return { projects, errorMessage, errorTitle }
    },
    {
      staleTime: 1000 * 60 * 60, // 1 hour
    },
  )

  const {
    projects,
    projectsThisUser,
    projectsSharedWithUser,
    projectsEditablePerUser,
  } = useMemo(() => {
    const projects = data?.projects || []
    const query = config.query

    let projectsInOrd = orderElements(projects, orderBy) as IProjectPreview[]

    if (query) {
      projectsInOrd = projectsInOrd?.filter((project) => {
        const nameInQuery = project.name
          .toLowerCase()
          .trim()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .includes(query.toLowerCase().trim())

        const userCreatorInQuery = project.creator.username
          ?.toLowerCase()
          .trim()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .includes(query.toLowerCase().trim())

        const createdAtInQuery = getDate(project.createdAt)
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .includes(query.toLowerCase().trim())

        if (nameInQuery || userCreatorInQuery || createdAtInQuery) return true

        return false
      })
    }

    const projectsThisUser = projectsInOrd.filter(
      (project) => project.creator.id === user?.account.id,
    )
    const projectsSharedWithUser = projectsInOrd.filter(
      (project) => project.creator.id !== user?.account.id,
    )
    const projectsEditablePerUser = projectsInOrd.filter((project) => {
      const userPermissionEdit = project.users.find(
        (u) => u.id === user?.account.id,
      )
      const projectOfUser = project.creator.id === user?.account.id

      if (!userPermissionEdit && !projectOfUser) {
        return undefined
      }

      return project
    })

    return {
      projects: projectsInOrd,
      projectsThisUser,
      projectsSharedWithUser,
      projectsEditablePerUser,
    }
  }, [config.query, orderBy, data?.projects, user?.account.id])

  const loadingProjects = !(!isLoading && !loadingUser && !isFetching)

  function findProject(id: string): IFindProjectResponse {
    const project = projects.find((project) => project.id === id)

    const projectName = project?.name ?? 'Carregando...'
    const projectImage = project?.image.url ?? undefined
    const createdAt = project?.createdAt
      ? getDate(project.createdAt)
      : 'Carregando...'

    const usersInProject: IUserInProject[] = project?.users ?? []

    return {
      project: project ?? null,
      projectName,
      projectImage,
      createdAt,
      usersInProject,
    }
  }

  const refetchProjects = refetch

  const callEvent: ICallEvent = {
    createProject: (newProject) => createProject(newProject, refetchProjects),
  }

  return {
    projects,
    projectsThisUser,
    projectsSharedWithUser,
    projectsEditablePerUser,
    loadingProjects,

    findProject,
    refetchProjects,
    callEvent,
  }
}
