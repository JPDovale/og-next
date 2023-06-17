import { IResponse } from '@api/responses/IResponse'
import {
  IAccountResponse,
  ISessionAndUserResponse,
  ISessionResponse,
  IUserResponse,
} from '@api/responsesTypes/user/IUser'
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

interface IGetUserRequestHeaders {
  cookies?: {
    token: string
    refreshToken: string
  }
}

export async function getUserRequest(
  props?: IGetUserRequestHeaders,
): Promise<IResponse<IUserResponse>> {
  if (props && props.cookies) {
    api.defaults.headers.cookies = JSON.stringify(props.cookies)
  }

  try {
    const response = await api.get('/users')
    return response.data
  } catch (err: any) {
    return err?.response?.data
  }
}

interface IGetOAuthUserRequest {
  id: string
}

export async function getOauthUserRequest({
  id,
}: IGetOAuthUserRequest): Promise<IResponse<IUserResponse>> {
  try {
    const response = await api.get(`/sessions/oauth/users/${id}`)
    return response.data
  } catch (err: any) {
    return err?.response?.data
  }
}

interface IGetOAuthByEmailUserRequest {
  email: string
}

export async function getOauthByEmailUserRequest({
  email,
}: IGetOAuthByEmailUserRequest): Promise<IResponse<IUserResponse>> {
  try {
    const response = await api.get(`/sessions/oauth/users/email/${email}`)
    return response.data
  } catch (err: any) {
    return err?.response?.data
  }
}

interface IGetOAuthByAccountUserRequest {
  provider: any
  providerAccountId: any
}

export async function getOauthByAccountUserRequest({
  provider,
  providerAccountId,
}: IGetOAuthByAccountUserRequest): Promise<IResponse<IUserResponse>> {
  try {
    const response = await api.get(
      `/sessions/oauth/users/provider/${provider}/${providerAccountId}`,
    )
    return response.data
  } catch (err: any) {
    return err?.response?.data
  }
}

export async function updateOAuthUserRequest(
  newInfos: IUpdateUserDTO,
  id: string,
): Promise<IResponse<IUserResponse>> {
  try {
    const response = await api.put(`/sessions/oauth/users/${id}`, newInfos)
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

interface ICreateOAuthAccountRequest {
  userId: string
  provider: string
  providerAccountId: string
  type: string
  accessToken: string
  expiresAt: number
  idToken: string
  refreshToken: string
  scope: string
  sessionState: string
  tokenType: string
}

export async function createOAuthAccountRequest(
  account: ICreateOAuthAccountRequest,
): Promise<IResponse<IAccountResponse>> {
  try {
    const response = await api.post(`/sessions/oauth/accounts`, account)
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

interface ICreateOAuthSessionRequest {
  userId: string
  expires: Date
  sessionToken: string
}

export async function createOAuthSessionRequest(
  account: ICreateOAuthSessionRequest,
): Promise<IResponse<ISessionResponse>> {
  try {
    const response = await api.post(`/sessions/oauth/session`, account)
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function getSessionAndUserRequest(
  sessionToken: string,
): Promise<IResponse<ISessionAndUserResponse>> {
  try {
    const response = await api.get(
      `/sessions/oauth/sessions/${sessionToken}/users`,
    )
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

export async function updateSessionRequest(
  sessionToken: string,
  expires?: Date,
  userId?: string,
): Promise<IResponse<ISessionResponse>> {
  try {
    const response = await api.put(`/sessions/oauth/sessions/${sessionToken}`, {
      expires,
      userId,
    })
    return response.data
  } catch (err: any) {
    return err.response.data
  }
}

interface ICreateOAuthUserRequest {
  email: string
  imageUrl?: string | null
  name?: string | null
}

export async function createOAuthUserRequest(
  data: ICreateOAuthUserRequest,
): Promise<IResponse<IUserResponse>> {
  try {
    const response = await api.post(`/sessions/oauth/users`, { ...data })
    return response.data
  } catch (err: any) {
    return err.response.data
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
    return err
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

interface IRefreshSessionRequest {
  setToken: boolean
}

export async function refreshSessionRequest(
  props?: IRefreshSessionRequest,
): Promise<IResponse> {
  const setToken = props?.setToken ?? false

  try {
    const response = await api.post('/sessions/refresh')

    if (setToken) {
      const token =
        response.headers['set-cookie']![1].split('=')[1].split(';')[0]

      const refreshToken =
        response.headers['set-cookie']![0].split('=')[1].split(';')[0]

      api.defaults.headers.cookies = JSON.stringify({ token, refreshToken })
    }

    return response.data
  } catch (err: any) {
    return err.response.data
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
