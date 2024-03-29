import { IShareProjectDTO } from '@api/dtos/IShareProjectDTO'
import { IResponse } from '@api/responses/IResponse'
import {
  IAppearance,
  IDream,
  IFear,
  IObjective,
  IPersonality,
  IPower,
  ITrauma,
  IValue,
  IWishe,
} from '@api/responsesTypes/person/IPerson'
import { IProjectResponse } from '@api/responsesTypes/project/IProject'
import { IProjectPreviewResponse } from '@api/responsesTypes/project/IProjectPreview'
import { api } from '..'
import { ICreateCommentDTO } from '../dtos/ICreateNewCommentDTO'
import { IUpdatePlotDTO } from '../dtos/IUpdatePlotDTO'
import { IChangeDoneTimeEventRequest } from './types/IChangeDoneTimeEventRequest'
import { IChangeFeaturesUsingRequest } from './types/IChangeFeaturesUsingRequest'
import { ICreateTimeEventRequest } from './types/ICreateTimeEventRequest'
import { IUpdateInitialDateRequest } from './types/IUpdateInitialDateRequest'

export async function getProjectsRequest(): Promise<
  IResponse<IProjectPreviewResponse>
> {
  try {
    const response = await api.get('/projects')
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function getProjectRequest(
  projectId: string,
): Promise<IResponse<IProjectResponse>> {
  try {
    const response = await api.get(`/projects/${projectId}`)
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function createProjectRequest(project: any) {
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
    const response = await api.post(
      `/projects/${projectId}/plot/comments`,
      newComment,
    )
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
    const response = await api.post(
      `/projects/${projectId}/plot/comments/${commentId}/responses`,
      {
        response: newResponse.content,
      },
    )
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
    const response = await api.patch(`/projects/${projectId}/name`, { name })
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function updateImageProjectRequest(projectId: string, file: File) {
  try {
    const response = await api.patch(
      `/projects/${projectId}/image/`,
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
) {
  try {
    const response = await api.put(`/projects/${projectId}/plot`, newPlot)
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
    const response = await api.patch(`/projects/${projectId}/unshare`, {
      userEmail,
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
    const response = await api.delete(`/projects/${projectId}/image`)
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

export async function getObjectivesRequest(
  projectId: string,
): Promise<IResponse<{ objectives: IObjective[] }>> {
  try {
    const response = await api.get(`/projects/${projectId}/objectives`)
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function getPersonalitiesRequest(
  projectId: string,
): Promise<IResponse<{ personalities: IPersonality[] }>> {
  try {
    const response = await api.get(`/projects/${projectId}/personalities`)
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function getValuesRequest(
  projectId: string,
): Promise<IResponse<{ values: IValue[] }>> {
  try {
    const response = await api.get(`/projects/${projectId}/values`)
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function getTraumasRequest(
  projectId: string,
): Promise<IResponse<{ traumas: ITrauma[] }>> {
  try {
    const response = await api.get(`/projects/${projectId}/traumas`)
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function getAppearancesRequest(
  projectId: string,
): Promise<IResponse<{ appearances: IAppearance[] }>> {
  try {
    const response = await api.get(`/projects/${projectId}/appearances`)
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function getDreamsRequest(
  projectId: string,
): Promise<IResponse<{ dreams: IDream[] }>> {
  try {
    const response = await api.get(`/projects/${projectId}/dreams`)
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function getFearsRequest(
  projectId: string,
): Promise<IResponse<{ fears: IFear[] }>> {
  try {
    const response = await api.get(`/projects/${projectId}/fears`)
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function getWishesRequest(
  projectId: string,
): Promise<IResponse<{ wishes: IWishe[] }>> {
  try {
    const response = await api.get(`/projects/${projectId}/wishes`)
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function getPowersRequest(
  projectId: string,
): Promise<IResponse<{ powers: IPower[] }>> {
  try {
    const response = await api.get(`/projects/${projectId}/powers`)
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function changeFeaturesUsingRequest({
  features,
  projectId,
}: IChangeFeaturesUsingRequest) {
  try {
    const response = await api.patch(`/projects/${projectId}/features`, {
      features,
    })
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function updateInitialDateRequest({
  body,
  projectId,
}: IUpdateInitialDateRequest) {
  try {
    const response = await api.patch(`/projects/${projectId}/date`, body)
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function createTimeEventRequest({
  projectId,
  data,
}: ICreateTimeEventRequest) {
  try {
    const response = await api.post(
      `/projects/${projectId}/timelines/timeEvents`,
      data,
    )
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function copyTimeLineToProjectRequest(
  projectId: string,
  timeLineId: string,
) {
  try {
    const response = await api.post(
      `/projects/${projectId}/timelines/${timeLineId}/copy`,
    )
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function changeDoneToDoEventRequest({
  projectId,
  timeEventId,
  timeLineId,
}: IChangeDoneTimeEventRequest) {
  try {
    const response = await api.patch(
      `/timelines/${timeLineId}/todo/${projectId}/timeEvents/${timeEventId}`,
    )
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}
