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

export async function verifyRequest() {
  try {
    const response = await api.get('/users/verify')
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function getUserRequest() {
  try {
    const response = await api.get('/users')
    return response.data
  } catch (err: any) {
    return err?.response?.data
  }
}

export async function createSessionRequest(
  email: string,
  password: string,
): Promise<ICreateSessionResponse> {
  try {
    const response = await api.post('/sessions/', { email, password })

    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function notifyUsersRequest(title: string, content: string) {
  try {
    const response = await api.post('/users/notify', { title, content })
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function createUserRequest(
  user: ICreateUserDTO,
): Promise<ICreateResponse> {
  try {
    const response = await api.post('/users', user)
    return response.data
  } catch (err: any) {
    return err.response.data
  }
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

export async function refreshSessionRequest() {
  try {
    const response = await api.post('/sessions/refresh')
    return response
  } catch (err: any) {
    return err.response.data
  }
}

export async function loginWithGoogleRequest(user: any) {
  try {
    const response = await api.post('/sessions/register/google', user)

    return response.data
  } catch (err: any) {
    return err.response
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

export async function sendMailForgotPasswordRequest(email: string) {
  try {
    const response = await api.post('/users/password/forgot', { email })
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function recoveryPasswordRequest(password: string, token: string) {
  try {
    const response = await api.post('/users/password/recovery', {
      password,
      token,
    })
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function visualizeNotificationsRequest() {
  try {
    const response = await api.patch('/users/notifications/visualize')
    return response.data
  } catch (err: any) {
    return err.response
  }
}
