import { getProjectsRequest } from '@api/projectsRequests'
import { IProjectResponse } from '@api/responsesTypes/IProjectResponse'
import { refreshSessionRequest } from '@api/userRequest'
import { InterfaceContext } from '@contexts/interface'
import { useUser } from '@hooks/useUser'
import { orderElements } from '@services/orderElements'
import { getDate } from '@utils/dates/getDate'
import { useContext, useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import { createProject } from './events/createProject'
import { ICallEvent } from './types/ICallEvent'

interface IUserInProject {
  id: string
  avatarImage: string | undefined
}

interface IFindProjectResponse {
  project: IProjectResponse | null

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

  const [loading, setLoading] = useState(true)

  const { user, loadingUser, isRefreshingSession } = useUser()
  const { orderBy } = useContext(InterfaceContext)

  const { data, isLoading, refetch, isFetching } = useQuery(
    'projects',
    async () => {
      let response = await getProjectsRequest()
      let errorMessage: string | null = null
      let errorTitle: string | null = null

      if (response.errorMessage === 'Invalid token' && !isRefreshingSession) {
        const refresh = await refreshSessionRequest()

        if (!refresh.errorMessage) {
          response = await getProjectsRequest()
        } else {
          errorMessage = refresh.errorMessage
          errorTitle = refresh.errorTitle
        }
      }

      const projects = response.projects as IProjectResponse[]

      return { projects, errorMessage, errorTitle }
    },
    {
      staleTime: 1000 * 60 * 60, // 1 hour
      onError: () => setLoading(false),
      onSuccess: () => setLoading(false),
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

    let projectsInOrd = orderElements(projects, orderBy) as IProjectResponse[]

    if (query) {
      projectsInOrd = projectsInOrd?.filter((project) =>
        project.name.toLowerCase().trim().includes(query.toLowerCase().trim()),
      )
    }

    const projectsThisUser = projects.filter(
      (project) => project.user.id === user?.id,
    )
    const projectsSharedWithUser = projects.filter(
      (project) => project.user.id !== user?.id,
    )
    const projectsEditablePerUser = projects.filter((project) => {
      const userPermissionEdit = project.users_with_access_edit?.users.find(
        (u) => u.id === user?.id,
      )
      const projectOfUser = project.user.id === user?.id

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
  }, [config.query, orderBy, data?.projects, user?.id])

  const loadingProjects = !(
    !isLoading &&
    !loadingUser &&
    !loading &&
    !isFetching
  )

  function findProject(id: string): IFindProjectResponse {
    const project = projects.find((project) => project.id === id)

    const projectName = project?.name ?? 'Carregando...'
    const projectImage = project?.image_url ?? undefined
    const createdAt = project?.created_at
      ? getDate(project.created_at)
      : 'Carregando...'

    const usersInProject: IUserInProject[] = []

    project?.users_with_access_comment?.users.map((user) =>
      usersInProject.push({
        id: user.id,
        avatarImage: user.avatar_url ?? undefined,
      }),
    )
    project?.users_with_access_view?.users.map((user) =>
      usersInProject.push({
        id: user.id,
        avatarImage: user.avatar_url ?? undefined,
      }),
    )
    project?.users_with_access_edit?.users.map((user) =>
      usersInProject.push({
        id: user.id,
        avatarImage: user.avatar_url ?? undefined,
      }),
    )

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
    createProject: (newProject) =>
      createProject(newProject, refetchProjects, setLoading),
  }

  return {
    projects,
    projectsThisUser,
    projectsSharedWithUser,
    projectsEditablePerUser,
    loadingProjects,
    setLoadingProjects: setLoading,

    findProject,
    refetchProjects,
    callEvent,
  }
}
