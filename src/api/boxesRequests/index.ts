import { IDeleteArchiveBoxRequest } from './types/IDeleteArchiveBoxRequest'
import { ICreateArchiveInBoxRequest } from './types/ICreateArchiveInBoxRequest'
import { api } from '..'
import { ICreateBoxRequest } from './types/ICreateBoxRequest'
import { ISaveImagesRequest } from './types/ISaveImagesRequest'

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
      `/boxes/${boxId}/archives/${archiveId}`,
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
