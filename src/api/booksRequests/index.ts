import { api } from '..'
import { ICreateBookRequest } from './types/ICreateBookRequest'
import { ICreateCapituleRequest } from './types/ICreateCapituleRequest'
import { ICreateSceneRequest } from './types/ICreateSceneRequest'
import { IUpdateCapituleRequest } from './types/IUpdateCapituleRequest'
import { IUpdateFrontCoverRequest } from './types/IUpdateFrontCoverRequest'

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

// PUT

export async function updateCapituleRequest(capitule: IUpdateCapituleRequest) {
  try {
    const response = await api.put('/books/capitules', capitule)
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
