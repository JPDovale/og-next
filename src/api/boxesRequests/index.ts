import { IUpdateArchiveRequest } from './types/IUpdateArchiveRequest'
import { IDeleteImageInArchiveRequest } from './types/IDeleteImageInArchiveRequest'
import { IDeleteArchiveBoxRequest } from './types/IDeleteArchiveBoxRequest'
import { ICreateArchiveInBoxRequest } from './types/ICreateArchiveInBoxRequest'
import { api } from '..'
import { ICreateBoxRequest } from './types/ICreateBoxRequest'
import { ISaveImagesRequest } from './types/ISaveImagesRequest'
import { IUpdateBoxRequest } from './types/IUpdateBoxRequest'

export async function createBoxRequest(box: ICreateBoxRequest) {
  try {
    const response = await api.post('/boxes', box)

    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function createArchiveInBoxRequest(
  archiveRequest: ICreateArchiveInBoxRequest,
) {
  try {
    const response = await api.post('/boxes/archives', archiveRequest)

    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function saveImagesRequest({
  archiveId,
  boxId,
  file,
}: ISaveImagesRequest) {
  try {
    const response = await api.patch(
      `/boxes/${boxId}/archives/${archiveId}/images`,
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

export async function deleteArchiveBoxRequest({
  boxId,
  archiveId,
}: IDeleteArchiveBoxRequest) {
  try {
    const response = await api.delete(`/boxes/${boxId}/archives/${archiveId}`)

    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function deleteImageInArchiveRequest({
  archiveId,
  boxId,
  imageId,
}: IDeleteImageInArchiveRequest) {
  try {
    const response = await api.delete(
      `/boxes/${boxId}/archives/${archiveId}/images/${imageId}`,
    )

    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function updateArchiveRequest({
  archiveId,
  boxId,
  description,
  title,
}: IUpdateArchiveRequest) {
  try {
    const response = await api.put(`/boxes/${boxId}/archives/${archiveId}`, {
      title,
      description,
    })
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function updateBoxRequest({
  boxId,
  description,
  name,
  tags,
}: IUpdateBoxRequest) {
  try {
    const response = await api.put(`/boxes/${boxId}`, {
      name,
      description,
      tags,
    })
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function deleteBoxRequest(boxId: string) {
  try {
    const response = await api.delete(`/boxes/${boxId}`)
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}
