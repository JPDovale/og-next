import { api } from '..'
import { ICreateCommentDTO } from '../dtos/ICreateNewCommentDTO'
import { IUpdatePlotDTO } from '../dtos/IUpdatePlotDTO'
import { IProjectResponse } from '../responsesTypes/IProjcetResponse'

export async function getProjectsRequest() {
  try {
    const response = await api.get('/projects')

    return response.data
  } catch (err: any) {
    return []
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

export async function shareProjectRequest(share: any) {
  try {
    const response = await api.patch('/projects/share', share)
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
    const response = await api.patch('/projects', { projectId })
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
