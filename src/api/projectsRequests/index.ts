import { IShareProjectDTO } from '@api/dtos/IShareProjectDTO'
import { api } from '..'
import { ICreateCommentDTO } from '../dtos/ICreateNewCommentDTO'
import { IUpdatePlotDTO } from '../dtos/IUpdatePlotDTO'
import { IProjectResponse } from '../responsesTypes/IProjectResponse'

export async function getProjectsRequest() {
  try {
    const response = await api.get('/projects')
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function getProjectRequest(projectId: string) {
  try {
    const response = await api.get(`/projects/${projectId}`)
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function createProjectRequest(
  project: any,
): Promise<IProjectResponse> {
  try {
    const response = await api.post('/projects', project)
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function commentInPlotRequest(
  newComment: ICreateCommentDTO,
  projectId: string,
) {
  try {
    const response = await api.post('/projects/plot/comments', {
      comment: newComment,
      projectId,
    })
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function responseCommentInPlotRequest(
  newResponse: ICreateCommentDTO,
  projectId: string,
  commentId: string,
) {
  try {
    const response = await api.post('/projects/plot/comments/response', {
      response: newResponse,
      projectId,
      commentId,
    })
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function updateNameProjectRequest(
  name: string,
  projectId: string,
) {
  try {
    const response = await api.patch('/projects/name', { name, projectId })
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function updateImageProjectRequest(projectId: string, file: File) {
  try {
    const response = await api.patch(
      `/projects/image-update/${projectId}`,
      { file },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    )

    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function shareProjectRequest(
  share: IShareProjectDTO,
  projectId: string,
) {
  try {
    const response = await api.patch(`/projects/${projectId}/share`, {
      permission: share.permission,
      email: share.email,
    })
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function updatePlotRequest(
  projectId: string,
  newPlot: IUpdatePlotDTO,
): Promise<IProjectResponse> {
  try {
    const response = await api.patch(`/projects/plot/${projectId}`, newPlot)
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function deleteProjectRequest(projectId: string) {
  try {
    const response = await api.delete(`/projects/${projectId}`)
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function unshareProjectRequest(
  userEmail: string,
  projectId: string,
) {
  try {
    const response = await api.patch(`/projects/unshare`, {
      userEmail,
      projectId,
    })
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

interface IDeleteImageProjectRequestProps {
  projectId: string
}

export async function deleteImageProjectRequest({
  projectId,
}: IDeleteImageProjectRequestProps) {
  try {
    const response = await api.delete(`/projects/image/${projectId}`)
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

interface IQuitProjectRequest {
  projectId: string
}

export async function quitProjectRequest({ projectId }: IQuitProjectRequest) {
  try {
    const response = await api.put(`/projects/${projectId}/quit`)
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function getObjectivesRequest(projectId: string) {
  try {
    const response = await api.get(`/projects/${projectId}/objectives`)
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function getPersonalitiesRequest(projectId: string) {
  try {
    const response = await api.get(`/projects/${projectId}/personalities`)
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function getValuesRequest(projectId: string) {
  try {
    const response = await api.get(`/projects/${projectId}/values`)
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function getTraumasRequest(projectId: string) {
  try {
    const response = await api.get(`/projects/${projectId}/traumas`)
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function getAppearancesRequest(projectId: string) {
  try {
    const response = await api.get(`/projects/${projectId}/appearances`)
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function getDreamsRequest(projectId: string) {
  try {
    const response = await api.get(`/projects/${projectId}/dreams`)
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function getFearsRequest(projectId: string) {
  try {
    const response = await api.get(`/projects/${projectId}/fears`)
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function getWishesRequest(projectId: string) {
  try {
    const response = await api.get(`/projects/${projectId}/wishes`)
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function getPowersRequest(projectId: string) {
  try {
    const response = await api.get(`/projects/${projectId}/powers`)
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}
