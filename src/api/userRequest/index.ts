import { api } from '..'
import { ICreateUserDTO } from '../dtos/ICreateUserDTO'
import { INewInitializeDTO } from '../dtos/INewInitializeDTO'
import { IUpdatePasswordDTO } from '../dtos/IUpdatePasswordDTO'
import { IUpdateUserDTO } from '../dtos/IUpdateUserDTO'
import {
  ICreateResponse,
  ICreateSessionResponse,
} from '../responsesTypes/ICreateResponse'
import { IInitResponse } from '../responsesTypes/IInitResponse'

export async function getUserRequest() {
  try {
    const response = await api.get('/users')
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function createSessionRequest(
  email: string,
  password: string,
): Promise<ICreateSessionResponse> {
  try {
    const response = await api.post('/sessions/create', { email, password })
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function createUserRequest(
  user: ICreateUserDTO,
): Promise<ICreateResponse> {
  const response = await api.post('/users', user)
  return response.data
}

export async function initializeUserRequest(
  newInitialization: INewInitializeDTO,
): Promise<IInitResponse> {
  try {
    const response = await api.post('/users/init', newInitialization)
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function refreshSessionRequest(token: string) {
  try {
    const response = await api.post('/sessions/refresh', { token: `${token}` })
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function loginWithGoogleRequest(user: any) {
  try {
    const response = await api.post('/sessions/register/google', user)

    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function updateUserRequest(newInfos: IUpdateUserDTO) {
  try {
    const response = await api.patch('/users/', newInfos)
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function updateAvatarRequest(file: File) {
  try {
    const response = await api.patch(
      `/users/avatar-update`,
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

export async function updatePasswordRequest(passwords: IUpdatePasswordDTO) {
  try {
    const response = await api.patch('/users/password', passwords)
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function logouRequest() {
  try {
    const response = await api.patch('/users/logout')
    return response
  } catch (err: any) {
    return err.response
  }
}

export async function deleteAvatarRequest() {
  try {
    const response = await api.delete('/users/avatar')
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}
