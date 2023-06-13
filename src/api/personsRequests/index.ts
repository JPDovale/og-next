import { IUpdatePersonDTO } from '@api/dtos/IUpdatePersonDTO'
import { IResponse } from '@api/responses/IResponse'
import { IPersonResponse } from '@api/responsesTypes/person/IPerson'
import { api } from '..'
import { ICreateCommentDTO } from '../dtos/ICreateNewCommentDTO'
import { ICreateObjectiveDTO } from '../dtos/ICreateObjectiveDTO'
import { IUpdateObjetiveDTO } from '../dtos/IUpdateObjetiveDTO'
import { ICreateCommentInPersonRequest } from './types/ICreateCommentInPersonRequest'
import { ICreateObjectInPersonRequest } from './types/ICreateObjectInPersonRequest'
import { ICreateObjectReferenceInPersonRequest } from './types/ICreateObjectReferenceInPersonRequest'
import { ICreatePersonRequest } from './types/ICreatePersonRequest'

interface IGenericObject {
  request: any
  key: string
}

// GET
export async function getAllPersonsThisUserRequest(projectId: string) {
  try {
    const response = await api.get(`/persons/${projectId}`)
    return response.data
  } catch (err: any) {
    return []
  }
}

export async function getPersonRequest(
  personId: string,
): Promise<IResponse<IPersonResponse>> {
  try {
    const response = await api.get(`/persons/${personId}`)
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

// POST
export async function createObjectInPersonRequest({
  object,
  path,
  personId,
}: ICreateObjectInPersonRequest) {
  try {
    const response = await api.post(`/persons/${personId}/${path}`, object)
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function createObjectReferenceInPersonRequest({
  path,
  personId,
  referenceId,
}: ICreateObjectReferenceInPersonRequest) {
  try {
    const response = await api.post(
      `/persons/${personId}/${path}/references/${referenceId}`,
    )
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function createPersonRequest({
  newPerson,
  projectId,
}: ICreatePersonRequest) {
  try {
    const response = await api.post(`/persons/${projectId}`, newPerson)
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function createObjetiveOfPersonRequest(
  newObjetive: ICreateObjectiveDTO,
) {
  try {
    const response = await api.post('/persons/objectives', newObjetive)
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function commentInPersonRequest({
  personId,
  objectComment,
}: ICreateCommentInPersonRequest) {
  try {
    const response = await api.post(
      `/persons/${personId}/comments/objects/${objectComment.toObjectId}`,
      objectComment.comment,
    )
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function responseCommentInPersonRequest(
  personId: string,
  commentId: string,
  newResponse: ICreateCommentDTO,
) {
  try {
    const response = await api.post(
      `/persons/${personId}/comments/${commentId}/responses`,
      {
        content: newResponse.content,
      },
    )
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function createObjectGenericRequest(
  genericObject: IGenericObject,
) {
  try {
    const response = await api.post(
      `/persons/${genericObject.key}`,
      genericObject.request,
    )
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

// PATCH
export async function updateImagePersonRequest(personId: string, file: File) {
  try {
    const response = await api.patch(
      `/persons/${personId}/image`,
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

export async function updateObjetiveOfPersonRequest(
  dataToUpdate: IUpdateObjetiveDTO,
) {
  try {
    const response = await api.patch('/persons/objectives', dataToUpdate)
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function saveRefObjectiveOfPersonRequest(newObjetive: any) {
  try {
    const response = await api.patch(
      '/persons/objectives/reference',
      newObjetive,
    )
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function saveRefObjectGenericRequest(newRef: IGenericObject) {
  try {
    const response = await api.patch(
      `/persons/${newRef.key}/reference`,
      newRef.request,
    )
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function updateObjectGenericRequest(update: IGenericObject) {
  try {
    const response = await api.patch(`/persons/${update.key}`, update.request)
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function deleteObjectGenericRequest(toDelete: IGenericObject) {
  try {
    const response = await api.patch(
      `/persons/${toDelete.key}/delete`,
      toDelete.request,
    )
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

interface IDeleteObjetiveRequest {
  personId: string
  objectiveId: string
}

export async function deleteObjectiveRequest({
  objectiveId,
  personId,
}: IDeleteObjetiveRequest) {
  try {
    const response = await api.patch(`/persons/objectives/delete`, {
      objectiveId,
      personId,
    })
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function updatePersonRequest(
  person: IUpdatePersonDTO,
  personId: string,
) {
  try {
    const response = await api.put(`/persons/${personId}`, person)
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

// DELETE

interface IDeleteImagePersonRequest {
  personId: string
}

export async function deleteImagePersonRequest({
  personId,
}: IDeleteImagePersonRequest) {
  try {
    const response = await api.delete(`/persons/${personId}/image`)
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function deletePersonRequest(personId: string) {
  try {
    const response = await api.delete(`/persons/${personId}`)
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}
