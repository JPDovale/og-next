import { api } from '..'
import { ICreateCommentDTO } from '../dtos/ICreateNewCommentDTO'
import { ICreateObjectiveDTO } from '../dtos/ICreateObjectiveDTO'
import { ICreatePersonDTO } from '../dtos/ICreatePersonDTO'
import { IUpdateObjetiveDTO } from '../dtos/IUpdateObjetiveDTO'

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

// POST
export async function createPersonRequest(person: ICreatePersonDTO) {
  try {
    const response = await api.post('/persons', person)
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

export async function commentInPersonRequest(
  newComment: ICreateCommentDTO,
  personId: string,
) {
  try {
    const response = await api.post('/persons/comments', {
      comment: newComment,
      personId,
    })
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function responseCommentInPersonRequest(
  newResponse: ICreateCommentDTO,
  personId: string,
  commentId: string,
) {
  try {
    const response = await api.post('/persons/comments/response', {
      response: newResponse,
      personId,
      commentId,
    })
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
export async function updateImagePersonRequest(person: string, file: File) {
  try {
    const response = await api.patch(
      `/persons/update-image/${person}`,
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
  person: ICreatePersonDTO,
  personId: string,
) {
  try {
    const response = await api.patch(`/persons`, { person, personId })
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
    const response = await api.delete(`/persons/image/${personId}`)
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}
