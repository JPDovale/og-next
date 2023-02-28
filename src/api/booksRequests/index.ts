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
export async function createBookRequest(bookDataRequest: ICreateBookRequest) {
  try {
    const response = await api.post('/books', bookDataRequest)
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function createCapituleRequest(capitule: ICreateCapituleRequest) {
  try {
    const response = await api.post('/books/capitules', capitule)
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function createSceneRequest(scene: ICreateSceneRequest) {
  try {
    const response = await api.post('/books/capitules/scenes', scene)
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function addGenreRequest(genreRequest: IAddGenreRequest) {
  try {
    const response = await api.post('/books/genres', genreRequest)
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

// PUT

export async function updateCapituleRequest(capitule: IUpdateCapituleRequest) {
  try {
    const response = await api.put('/books/capitules', capitule)
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function setSceneToCompleteRequest(
  body: ISetSceneToCompleteRequest,
) {
  try {
    const response = await api.put('/books/capitules/scenes/complete', body)
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function reorderScenesRequest(body: IReorderScenesRequest) {
  try {
    const response = await api.put('/books/capitules/scenes/reorder', body)
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function reorderCapitulesRequest(body: IReorderCapitulesRequest) {
  try {
    const response = await api.put('/books/capitules/reorder', body)
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function updateSceneRequest(body: IUpdateSceneRequest) {
  try {
    const response = await api.put('/books/capitules/scenes', body)
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function removeGenreRequest(genreRequest: IRemoveGenreRequest) {
  try {
    const response = await api.put('/books/genres', genreRequest)
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function updateBookRequest(bookToUpdate: IUpdateBookRequest) {
  try {
    const response = await api.put('/books', bookToUpdate)
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
      `/books/update-frontCover/${bookId}`,
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
    const response = await api.delete(`/books/front-cover/${bookId}`)
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
