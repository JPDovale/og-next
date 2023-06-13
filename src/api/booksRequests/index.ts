import { IResponse } from '@api/responses/IResponse'
import { IBookResponse } from '@api/responsesTypes/book/IBook'
import { ICapituleResponse } from '@api/responsesTypes/capitule/ICapitule'
import { api } from '..'
import { IAddGenreRequest } from './types/IAddGenreRequest'
import { ICreateBookRequest } from './types/ICreateBookRequest'
import { ICreateCapituleRequest } from './types/ICreateCapituleRequest'
import { ICreateSceneRequest } from './types/ICreateSceneRequest'
import { IDeleteCapituleRequest } from './types/IDeleteCapituleRequest'
import { IDeleteSceneRequest } from './types/IDeleteSceneRequest'
import { IRemoveGenreRequest } from './types/IRemoveGenreRequest'
import { IReorderCapitulesRequest } from './types/IReorderCapitulesRequest'
import { IReorderScenesRequest } from './types/IReorderScenesRequest'
import { ISetSceneToCompleteRequest } from './types/ISetSceneToCompleteRequest'
import { IUpdateBookRequest } from './types/IUpdateBookRequest'
import { IUpdateCapituleRequest } from './types/IUpdateCapituleRequest'
import { IUpdateFrontCoverRequest } from './types/IUpdateFrontCoverRequest'
import { IUpdateSceneRequest } from './types/IUpdateSceneRequest'

// POST
export async function createBookRequest({
  book,
  projectId,
}: ICreateBookRequest) {
  try {
    const response = await api.post(`/books/${projectId}`, book)
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function createCapituleRequest({
  bookId,
  capitule,
}: ICreateCapituleRequest) {
  try {
    const response = await api.post(`/books/${bookId}/capitules`, capitule)
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function createSceneRequest({
  scene,
  bookId,
  capituleId,
}: ICreateSceneRequest) {
  try {
    const response = await api.post(
      `/books/${bookId}/capitules/${capituleId}/scenes`,
      scene,
    )
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function addGenreRequest({ bookId, genre }: IAddGenreRequest) {
  try {
    const response = await api.post(`/books/${bookId}/genres`, { genre })
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

// PUT

export async function updateCapituleRequest({
  bookId,
  capitule,
  capituleId,
}: IUpdateCapituleRequest) {
  try {
    const response = await api.put(
      `/books/${bookId}/capitules/${capituleId}`,
      capitule,
    )
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function setSceneToCompleteRequest({
  bookId,
  capituleId,
  completeInfos,
}: ISetSceneToCompleteRequest) {
  try {
    const response = await api.put(
      `/books/${bookId}/capitules/${capituleId}/scenes/${completeInfos.sceneId}/complete`,
      completeInfos,
    )
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function reorderScenesRequest({
  bookId,
  capituleId,
  sequences,
}: IReorderScenesRequest) {
  try {
    const response = await api.put(
      `/books/${bookId}/capitules/${capituleId}/scenes/reorder`,
      sequences,
    )
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function reorderCapitulesRequest({
  bookId,
  sequenceFrom,
  sequenceTo,
}: IReorderCapitulesRequest) {
  try {
    const response = await api.put(`/books/${bookId}/capitules/reorder`, {
      sequenceFrom,
      sequenceTo,
    })
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function updateSceneRequest({
  bookId,
  capituleId,
  scene,
}: IUpdateSceneRequest) {
  try {
    const response = await api.put(
      `/books/${bookId}/capitules/${capituleId}/scenes/${scene.id}`,
      scene,
    )
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function removeGenreRequest({
  bookId,
  genreId,
}: IRemoveGenreRequest) {
  try {
    const response = await api.delete(`/books/${bookId}/genres/${genreId}`)
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function updateBookRequest({
  bookId,
  updatedBook,
}: IUpdateBookRequest) {
  try {
    const response = await api.put(`/books/${bookId}`, updatedBook)
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

// PATCH
export async function updateFrontCoverRequest({
  bookId,
  file,
}: IUpdateFrontCoverRequest) {
  try {
    const response = await api.patch(
      `/books/${bookId}/image`,
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

// DELETE
export async function removeFrontCoverRequest(bookId: string) {
  try {
    const response = await api.delete(`/books/${bookId}/image`)
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function deleteSceneRequest({
  bookId,
  capituleId,
  sceneId,
}: IDeleteSceneRequest) {
  try {
    const response = await api.delete(
      `/books/${bookId}/capitules/${capituleId}/scenes/${sceneId}`,
    )
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function deleteCapituleRequest({
  bookId,
  capituleId,
}: IDeleteCapituleRequest) {
  try {
    const response = await api.delete(
      `/books/${bookId}/capitules/${capituleId}/`,
    )
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function deleteBookRequest(bookId: string) {
  try {
    const response = await api.delete(`/books/${bookId}`)
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

// GET

export async function getBookRequest(
  bookId: string,
): Promise<IResponse<IBookResponse>> {
  try {
    const response = await api.get(`/books/${bookId}`)
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function getCapituleRequest(
  capituleId: string,
): Promise<IResponse<ICapituleResponse>> {
  try {
    const response = await api.get(`/books/capitules/${capituleId}`)
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}
