import { IResponse } from '@api/responses/IResponse'
import { IUserResponse } from '@api/responsesTypes/user/IUser'
import { api } from '..'
import { ICreateUserDTO } from '../dtos/ICreateUserDTO'
import { INewInitializeDTO } from '../dtos/INewInitializeDTO'
import { IUpdatePasswordDTO } from '../dtos/IUpdatePasswordDTO'
import { IUpdateUserDTO } from '../dtos/IUpdateUserDTO'
import { IInitResponse } from '../responsesTypes/IInitResponse'

export async function verifyRequest() {
  try {
    const response = await api.get('/users/verify')
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function getUserRequest(): Promise<IResponse<IUserResponse>> {
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
): Promise<IResponse<IUserResponse>> {
  try {
    const response = await api.post('/sessions/', { email, password })
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function notifyUsersRequest(
  title: string,
  content: string,
): Promise<IResponse> {
  try {
    const response = await api.post('/users/notify', { title, content })
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function createUserRequest(
  user: ICreateUserDTO,
): Promise<IResponse<IUserResponse>> {
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

export async function refreshSessionRequest(): Promise<IResponse> {
  try {
    const response = await api.post('/sessions/refresh')
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
    return err.response
  }
}

export async function updateUserRequest(
  newInfos: IUpdateUserDTO,
): Promise<IResponse<IUserResponse>> {
  try {
    const response = await api.patch('/users/', newInfos)
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function updateAvatarRequest(
  file: File,
): Promise<IResponse<IUserResponse>> {
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

export async function updatePasswordRequest(
  passwords: IUpdatePasswordDTO,
): Promise<IResponse> {
  try {
    const response = await api.patch('/users/password', passwords)
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function logouRequest(): Promise<IResponse> {
  try {
    const response = await api.patch('/users/logout')
    return response.data
  } catch (err: any) {
    return err.response
  }
}

export async function deleteAvatarRequest(): Promise<IResponse<IUserResponse>> {
  try {
    const response = await api.delete('/users/avatar')
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function sendMailForgotPasswordRequest(
  email: string,
): Promise<IResponse> {
  try {
    const response = await api.post('/users/password/forgot', { email })
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function recoveryPasswordRequest(
  password: string,
  token: string,
): Promise<IResponse> {
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
