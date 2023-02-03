// POST

import { api } from '..'
import { ICreateBookRequest } from './types/ICreateBookRequest'

export async function createBookRequest(bookDataRequest: ICreateBookRequest) {
  try {
    const response = await api.post('/books', bookDataRequest)
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}
