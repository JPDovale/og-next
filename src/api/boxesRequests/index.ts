import { ICreateArchiveInBoxRequest } from './types/ICreateArchiveInBoxRequest'
import { api } from '..'
import { ICreateBoxRequest } from './types/ICreateBoxRequest'

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
